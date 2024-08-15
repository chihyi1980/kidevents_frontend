import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { IconButton, ListItem, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const SortableItem = ({ item, handleConfirmDialog, isDelete = false }) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: item._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <ListItem>
                <ListItemText primary={item.value} secondary={item.subValue} />
                {isDelete && (
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onMouseDown={() => handleConfirmDialog(item)}
                    >
                        <DeleteIcon />
                    </IconButton>
                )}

            </ListItem>
        </div>
    )
}

export default SortableItem