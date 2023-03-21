import react, { useRef } from 'react'
import styles from './constructor-item.module.css'
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientShapePropType } from '../../prop-types';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { MOVE_CONSTRUCTOR_ITEM, REMOVE_CONSTRUCTOR_ITEM } from '../../store/actions/burger-constructor';
import { useDrag, useDrop } from 'react-dnd';

const ConstructorItem = ({ ingredientData, index }) => {
    const dispatch = useDispatch();

    const ref = useRef(null)
    const [{isDragging}, dragRef] = useDrag({
        type: 'addedIngredient',
        item: { 
            id: ingredientData.uuid,
            index,
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const [{handlerId}, dropRef] = useDrop({
        accept: 'addedIngredient',
        collect: monitor => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover(item, monitor) {
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

            const hoverClientY = clientOffset.y - hoverBoundingRect.top

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
    
    const handleClose = () => {
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

ConstructorItem.propTypes = {
    ingredientData: ingredientShapePropType.isRequired,
    index: PropTypes.number.isRequired,
}

export default ConstructorItem