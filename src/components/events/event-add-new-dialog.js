import React, { useState, useEffect } from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Stack, OutlinedInput, Box, Typography,
    FormControl, InputLabel, Select, MenuItem, Autocomplete, Divider
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs'; // Import dayjs
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';

import 'dayjs/locale/zh-cn';
import axios from 'axios';

const EventAddnewDialog = ({ open, onClose, locOptions, tagOptions }) => {
    const today = dayjs(); // Get today's date

    const [newEvent, setNewEvent] = useState({
        event_name: '',
        event_start_date: today,
        event_end_date: today,
        event_min_age: 6,
        event_max_age: 11,
        event_loc: '',
        event_tag: '',
        event_price: '',
        event_link: '',
        event_content: '',
        event_img: '',
        event_loc_detail: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewEvent({ ...newEvent, [name]: value })

        console.log(newEvent);
    };

    // const handleTagChange = (event) => {
    //     const { name, value } = event.target;
    
    //     // 使用 map() 提取每個 item 的 _id
    //     let newAry = value.map(item => item._id);
    
    //     console.log(name);  // 打印 name
    //     console.log(newAry);  // 打印提取出的 _id 的新陣列
    
    //     // 將 newAry 存入 newEvent 的對應字段
    //     setNewEvent({ ...newEvent, [name]: newAry });
    // };
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // 从 localStorage 中获取 token
            const token = localStorage.getItem('token');

            // 设置请求头
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            const res = await axios.post('http://localhost:5000/api/events/create', newEvent, config);

            console.log('Data posted successfully:', res.data);
        } catch (error) {
            console.error('Error posting data:', error);
            alert('Error posting data:', '請重新登入');
        }

        onClose();
    };
    const handleClose = (event) => {
        onClose();
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'zh-cn'}>
            <Dialog open={open} fullWidth>
                <DialogTitle>Event - Add New</DialogTitle>
                <DialogContent>
                    <Stack direction='column' spacing={2} sx={{ mt: 1 }}>
                        <TextField size='small' fullWidth label="活動名稱" name='event_name' onChange={handleChange} autoComplete='off' />

                        <Divider sx={{ my: 2 }} /> {/* 分隔線 */}

                        <Stack direction='row' spacing={2}>
                            <DatePicker
                                label="開始日期"
                                value={newEvent.event_start_date}
                                onChange={(date) => handleChange({ target: { name: 'event_start_date', value: date } })}
                                renderInput={(params) => <DateField {...params} size='small' fullWidth />}
                                minDate={today}
                            />
                            <DatePicker
                                label="結束日期"
                                value={newEvent.event_end_date}
                                onChange={(date) => handleChange({ target: { name: 'event_end_date', value: date } })}
                                renderInput={(params) => <DateField {...params} size='small' fullWidth />}
                                minDate={newEvent.event_start_date}
                            />
                        </Stack>

                        <Divider sx={{ my: 2 }} /> {/* 分隔線 */}

                        <Stack direction='row' spacing={2}>
                            <FormControl size='small' fullWidth>
                                <InputLabel>最小年齡</InputLabel>
                                <Select
                                    name='event_min_age'
                                    value={newEvent.event_min_age || ''}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="最小年齡" />}
                                >
                                    <MenuItem value="1"> 1 : 嬰兒</MenuItem>
                                    <MenuItem value="2"> 2 : 嬰兒</MenuItem>
                                    <MenuItem value="3"> 3 : 幼小</MenuItem>
                                    <MenuItem value="4"> 4 : 幼中</MenuItem>
                                    <MenuItem value="5"> 5 : 幼大</MenuItem>
                                    <MenuItem value="6"> 6 : 小一</MenuItem>
                                    <MenuItem value="7"> 7 : 小二</MenuItem>
                                    <MenuItem value="8"> 8 : 小三</MenuItem>
                                    <MenuItem value="9"> 9 : 小四</MenuItem>
                                    <MenuItem value="10"> 10 : 小五</MenuItem>
                                    <MenuItem value="11"> 11 : 小六</MenuItem>
                                    <MenuItem value="12"> 12 : 國一</MenuItem>
                                    <MenuItem value="13"> 13 : 國二</MenuItem>
                                    <MenuItem value="14"> 14 : 國三</MenuItem>
                                    <MenuItem value="15"> 15 : 高一</MenuItem>
                                    <MenuItem value="16"> 16 : 高二</MenuItem>
                                    <MenuItem value="17"> 17 : 高三</MenuItem>
                                    <MenuItem value="18"> 18 : 大一</MenuItem>
                                    <MenuItem value="19"> 19 : 大二</MenuItem>
                                    <MenuItem value="20"> 20 : 大三</MenuItem>
                                    <MenuItem value="21"> 21 : 大四</MenuItem>
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
                                    <MenuItem value="1"> 1 : 嬰兒</MenuItem>
                                    <MenuItem value="2"> 2 : 嬰兒</MenuItem>
                                    <MenuItem value="3"> 3 : 幼小</MenuItem>
                                    <MenuItem value="4"> 4 : 幼中</MenuItem>
                                    <MenuItem value="5"> 5 : 幼大</MenuItem>
                                    <MenuItem value="6"> 6 : 小一</MenuItem>
                                    <MenuItem value="7"> 7 : 小二</MenuItem>
                                    <MenuItem value="8"> 8 : 小三</MenuItem>
                                    <MenuItem value="9"> 9 : 小四</MenuItem>
                                    <MenuItem value="10"> 10 : 小五</MenuItem>
                                    <MenuItem value="11"> 11 : 小六</MenuItem>
                                    <MenuItem value="12"> 12 : 國一</MenuItem>
                                    <MenuItem value="13"> 13 : 國二</MenuItem>
                                    <MenuItem value="14"> 14 : 國三</MenuItem>
                                    <MenuItem value="15"> 15 : 高一</MenuItem>
                                    <MenuItem value="16"> 16 : 高二</MenuItem>
                                    <MenuItem value="17"> 17 : 高三</MenuItem>
                                    <MenuItem value="18"> 18 : 大一</MenuItem>
                                    <MenuItem value="19"> 19 : 大二</MenuItem>
                                    <MenuItem value="20"> 20 : 大三</MenuItem>
                                    <MenuItem value="21"> 21 : 大四</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>

                        <Divider sx={{ my: 2 }} /> {/* 分隔線 */}

                        <Stack direction='row' spacing={1}>
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
                            
                        </Stack>
                        <Stack direction='row' spacing={2}>
                            <TextField size='small' fullWidth label="詳細地址" name='event_loc_detail' onChange={handleChange} autoComplete='off' />
                        </Stack>

                        <Divider sx={{ my: 2 }} /> {/* 分隔線 */}

                        <Stack direction='row' spacing={1}>

                            <FormControl size='small' fullWidth>
                                <Autocomplete
                                    multiple
                                    id="event_tag"
                                    options={tagOptions}
                                    getOptionLabel={(option) => option.value}
                                    value={newEvent.event_tag || []}
                                    onChange={(event, newValue) => handleChange({ target: { name: 'event_tag', value: newValue } })}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.value}
                                        </li>
                                    )}
                                    renderInput={(params) => <TextField {...params} label="活動類型" placeholder="選擇類型" />}
                                />
                            </FormControl>

                        </Stack>

                        <Divider sx={{ my: 2 }} /> {/* 分隔線 */}

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

