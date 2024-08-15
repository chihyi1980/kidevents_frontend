import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Box, Button, Card, CardContent, CardHeader, Divider, TextField, 
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material'
import SortableList from './sortable-list'

const OperationList = ({ title, dataSource, isDelete = true, isDnD = true, autoOrder = false }) => {

    const [settings, setSettings] = useState([]);
    const [setting, setSetting] = useState(null);
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(false);

    const [formValue, setFormValue] = useState({
        title: '',
        subTitle: ''
    })

    useEffect(() => {

        const fetchData = async () => {

            const response = await axios.get(`http://localhost:5000/api/${dataSource}/list`);
            const settings = response.data.filter(x => x.isEnable);
         
            settings.map((x, index) => (
                {
                    ...x,
                    order: index
                }
            ))

            settings.sort((a, b) => {
               if (a.order > b.order) return 1;
               if (a.order < b.order) return -1;

               return 0;
            })
           
            setSettings(settings);
        }

        fetchData();
    }, [reload, dataSource])

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const handleAddSetting = async () => {

        const title = formValue.title;
        // const subTitle = formValue.subTitle;

        if (!title) return;

        // if (enableSubTitle && !subTitle) return;

        // await updateOrder(settings, true);

        await axios.post(`http://localhost:5000/api/${dataSource}/create`, {
            value: title,
            // subValue: subTitle,
            order: 0,
            isEnable: 1
            // autoOrder: autoOrder
        })

        setFormValue({
            title: '',
            subTitle: ''
        })

        setReload(!reload);
    }

    const handleConfirmDialog = (setting) => {
        setSetting(setting);
        setOpen(true);
    }

    const handleDelete = async (item) => {
        let newItem = {...item};
        newItem['isEnable'] = 0;
        delete newItem['_id'];
        await axios.put(`http://localhost:5000/api/${dataSource}/${item['_id']}`, newItem);
        setOpen(false);
        setReload(!reload);
    }

    const handleSortItems = (items) => {
        setSettings(items);
        updateOrder(items, dataSource);
    }

    return (
        <>
            <Card>
                <CardHeader title={title} />

                <Divider />

                <CardContent>
                    <TextField
                        fullWidth
                        name='title'
                        value={formValue.title}
                        label='Title'
                        margin="normal"
                        type="text"
                        variant="outlined"
                        onChange={handleChange}
                        autoComplete='off'
                    />

                    {/* {enableSubTitle && (
                        <TextField
                            fullWidth
                            name='subTitle'
                            value={formValue.subTitle}
                            label='SubTitle'
                            margin="normal"
                            type="text"
                            variant="outlined"
                            onChange={handleChange}
                            autoComplete='off'
                        />
                    )} */}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                        <Button color="primary" variant="contained" onClick={handleAddSetting}>add</Button>
                    </Box>
                </CardContent>

                <Divider />

                <Box>
                    <SortableList 
                        title={title}
                        items={settings} 
                        handleConfirmDialog={handleConfirmDialog} 
                        onSortItems={handleSortItems}
                        isDelete={isDelete}
                        isDnD={isDnD}
                        />
                </Box>
            </Card>
            <ConfirmDialog
                open={open}
                handleClose={() => setOpen(false)}
                setting={setting}
                confirmDelete={handleDelete}
            />
        </>
    )
}

export default OperationList

const ConfirmDialog = ({ open, handleClose, setting, confirmDelete }) => {

    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Confirm
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    {`Are you sure to delete ${setting?.value} ?`}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => confirmDelete(setting)}>
                    Yes
                </Button>
                <Button
                    autoFocus
                    onClick={handleClose}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const updateOrder = async (items, dataSource, isAdd = false) => {

    let newAry = [];

    items.map(async(item, index) => {
        newAry.push({
            '_id': item['_id'],
            'order': isAdd ? index + 1 : index
        });
    });

    console.log(newAry);

    await axios.put(`http://localhost:5000/api/${dataSource}/bulk-update`, newAry);

}