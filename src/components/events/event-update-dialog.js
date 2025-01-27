import React, { useState, useEffect } from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Stack, OutlinedInput,
    FormControl, InputLabel, Select, MenuItem, Autocomplete, Divider
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs'; // Import dayjs
import Checkbox from '@mui/material/Checkbox';

import 'dayjs/locale/zh-cn';
import axios from 'axios';

const EventUpdateDialog = ({ open, onClose, locOptions, tagOptions, event_id }) => {
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
        event_org: '',
    });
    const API_HOST = process.env.REACT_APP_API_HOST;

    useEffect(() => {
        // 定义一个异步函数
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`${API_HOST}/api/events/${event_id}`);
                const data = response.data;

                let updateEvent = { ...data };
                // 将字符串日期转换为 dayjs 对象
                updateEvent['event_start_date'] = dayjs(data['event_start_date']);
                updateEvent['event_end_date'] = dayjs(data['event_end_date']);

                setNewEvent(updateEvent);
            } catch (error) {
                console.error("Failed to fetch event data", error);
            }
        };

        // 仅当 dialog 打开时调用
        if (open) {
            fetchEventData();
        }

    }, [event_id, open]);  // 添加 open 作为依赖项，确保在对话框打开时加载数据

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewEvent({ ...newEvent, [name]: value })
    };

    const handleUpdate = async (event) => {
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

            delete newEvent['_id'];

            const res = await axios.put(`${API_HOST}/api/events/${event_id}`, newEvent, config);

            console.log('Data put successfully:', res.data);
        } catch (error) {
            console.error('Error put data:', error);
            alert('Error put data:', '請重新登入');
        }

        onClose();
    };
    const handleClose = (event) => {
        onClose();
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'zh-cn'}>
            <Dialog open={open} fullWidth>
                <DialogTitle>Event - Update</DialogTitle>
                <DialogContent>
                    <Stack direction='column' spacing={2} sx={{ mt: 1 }}>
                        <TextField size='small' fullWidth label="活動名稱" value={newEvent.event_name} name='event_name' onChange={handleChange} autoComplete='off' />

                        <TextField size='small' fullWidth label="活動單位" value={newEvent.event_org} name='event_org' onChange={handleChange} autoComplete='off' />

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
                            <TextField size='small' fullWidth label="詳細地址" name='event_loc_detail' value={newEvent.event_loc_detail || ''} onChange={handleChange} autoComplete='off' />
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
                            <TextField size='small' fullWidth label="價格" name='event_price' value={newEvent.event_price} onChange={handleChange} autoComplete='off' />
                            <TextField size='small' fullWidth label="活動連結" name='event_link' value={newEvent.event_link} onChange={handleChange} autoComplete='off' />
                        </Stack>


                        <TextField
                            multiline
                            rows={4}
                            size='small'
                            fullWidth
                            label="活動內容"
                            name='event_content'
                            value={newEvent.event_content}
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
                            value={newEvent.event_img}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button variant='text' onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' autoFocus onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );

}

export default EventUpdateDialog;

