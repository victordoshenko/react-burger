import { FC, useRef } from 'react'
import styles from './constructor-item.module.css'
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { TConstructorIngredient } from '../../types';
import { Identifier } from 'typescript';
import { MOVE_CONSTRUCTOR_ITEM, REMOVE_CONSTRUCTOR_ITEM } from '../../store/actions/actionTypes';
import { useAppDispatch } from '../../hooks/store';

type ConstructorItemProps = {
    ingredientData: TConstructorIngredient;
    index: number;
};

type DragItem = {
    id: string;
    index: number;
};

const ConstructorItem: FC<ConstructorItemProps> = ({ ingredientData, index }) => {
    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement>(null)
    const [{isDragging}, dragRef] = useDrag({
        type: 'addedIngredient',
        item: {
            id: ingredientData.uuid,
            index,
        },
        collect:(monitor: any )=> ({
            isDragging: monitor.isDragging(),
        }),
    });
    const [{handlerId}, dropRef] = useDrop<DragItem, void, { handlerId: Identifier | null }>({ 
        accept: 'addedIngredient',
        collect(monitor: any) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            
            if (dragIndex === hoverIndex) {
                return
            }
            
            const hoverBoundingRect = ref.current?.getBoundingClientRect()            
            const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2            
            const clientOffset = monitor.getClientOffset()            
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
            
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            
            dispatch({ 
                type: MOVE_CONSTRUCTOR_ITEM,
                payload: { 
                    from: dragIndex,
                    to: hoverIndex
                },
            })

            item.index = hoverIndex
        }
    });
    dragRef(dropRef(ref));
    
    const handleClose: () => void = () => {
        dispatch({ type: REMOVE_CONSTRUCTOR_ITEM, payload: ingredientData })
    }

    return (
        <div 
            ref={ref} 
            draggable 
            className={styles.constructorItem}
            style={{ opacity: isDragging ? '0' : '1' }}
            data-handler-id={handlerId}
        >
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredientData.name}
                price={ingredientData.price}
                thumbnail={ingredientData.image_mobile}
                handleClose={handleClose}
            />
        </div>
    )
}

export default ConstructorItem