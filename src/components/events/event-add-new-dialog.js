import React, { useState, useEffect } from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Stack, OutlinedInput, Box, Typography,
    FormControl, InputLabel, Select, MenuItem, Autocomplete
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateField } from '@mui/x-date-pickers/DateField';

import 'dayjs/locale/zh-cn';

const EventAddnewDialog = ({ open, onClose, locOptions, tagOptions }) => {


    const [newEvent, setNewEvent] = useState({
        event_name: '',
        event_start_date: null,
        event_end_date: null,
        event_min_age: 1,
        event_max_age: 20,
        event_loc: '',
        event_tag: '',
        event_price: '',
        event_link: '',
        event_content: '',
        event_img: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewEvent({...newEvent, [name]: value })
     };
    const handleSubmit = (event) => { };
    const handleClose = (event) => {
        onClose();
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}   adapterLocale={'zh-cn'}>
            <Dialog open={open} fullWidth>
                <DialogTitle>Event - Add New</DialogTitle>
                <DialogContent>
                    <Stack direction='column' spacing={2} sx={{ mt: 1 }}>
                        <TextField size='small' fullWidth label="活動名稱" name='event_name' onChange={handleChange} autoComplete='off' />

                        <Stack direction='row' spacing={2}>
                            <DatePicker
                                label="開始日期"
                                value={newEvent.event_start_date}
                                onChange={(date) => handleChange({ target: { name: 'event_start_date', value: date } })}
                                renderInput={(params) => <DateField {...params} size='small' fullWidth />}
                            />
                            <DatePicker
                                label="結束日期"
                                value={newEvent.event_end_date}
                                onChange={(date) => handleChange({ target: { name: 'event_end_date', value: date } })}
                                renderInput={(params) => <DateField {...params} size='small' fullWidth />}
                            />
                        </Stack>

                        <Stack direction='row' spacing={2}>
                            <FormControl size='small' fullWidth>
                                <InputLabel>最小年齡</InputLabel>
                                <Select
                                    name='event_min_age'
                                    value={newEvent.event_min_age || ''}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="最小年齡" />}
                                >
                                    {[...Array(20)].map((_, index) => (
                                        <MenuItem key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl size='small' fullWidth>
                                <InputLabel>最大年齡</InputLabel>
                                <Select
                                    name='event_max_age'
                                    value={newEvent.event_max_age || ''}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="最大年齡" />}
                                >
                                    {[...Array(20)].map((_, index) => (
                                        <MenuItem key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>

                        <Stack direction='row' spacing={2}>
                            <FormControl size='small' fullWidth>
                                <InputLabel>地點</InputLabel>
                                <Select
                                    name='event_loc'
                                    value={newEvent.event_loc || ''}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="地點" />}
                                >
                                    {
                                        locOptions.map((loc) => (
                                            <MenuItem value={loc._id}> {loc.value} </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <FormControl size='small' fullWidth>
                                <InputLabel>類型</InputLabel>
                                <Select
                                    name='event_tag'
                                    value={newEvent.event_tag || ''}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="類型" />}
                                >
                                    {
                                        tagOptions.map((tag) => (
                                            <MenuItem value={tag._id}> {tag.value} </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Stack>

                        <Stack direction='row' spacing={2}>
                            <TextField size='small' fullWidth label="價格" name='event_price' onChange={handleChange} type="number" autoComplete='off' />
                            <TextField size='small' fullWidth label="活動連結" name='event_link' onChange={handleChange} autoComplete='off' />
                        </Stack>

                        <TextField
                            multiline
                            rows={4}
                            size='small'
                            fullWidth
                            label="活動內容"
                            name='event_content'
                            onChange={handleChange}
                            autoComplete='off'
                        />

                        <TextField
                            multiline
                            rows={4}
                            size='small'
                            fullWidth
                            label="活動圖片，用逗號分隔多張圖片"
                            name='event_img'
                            onChange={handleChange}
                            autoComplete='off'
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant='text' onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' autoFocus onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );

}

export default EventAddnewDialog;

