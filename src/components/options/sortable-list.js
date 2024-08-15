import React from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SortableItem from './sortable-item'

const SortableList = ({ title, items, handleConfirmDialog, onSortItems, isDelete, isDnD }) => {

    const handleDragEnd = (event) => {
        if (!isDnD) return;

        const { active, over } = event;

        if(!active || !over) return;
       
        if (active.id !== over.id) {
            const activeItemIndex = items.findIndex(item => item._id === active.id);
            const overItemIndex = items.findIndex(item => item._id === over.id);

            let sortedItems = [...items];
            const activeItem = sortedItems.splice(activeItemIndex, 1);
            sortedItems.splice(overItemIndex, 0, ...activeItem);

            onSortItems(sortedItems);
        }
    }

    return (
        <DndContext
            id={title}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                {items.map(item => (
                    <SortableItem key={item._id} item={item} handleConfirmDialog={handleConfirmDialog} isDelete={isDelete} />
                ))}
            </SortableContext>
        </DndContext>
    )
}

export default SortableList;