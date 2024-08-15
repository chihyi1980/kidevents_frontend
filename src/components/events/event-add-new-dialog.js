import React, { useState, useEffect } from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Stack, OutlinedInput, Box, Typography,
    FormControl, InputLabel, Select, MenuItem, Autocomplete
} from '@mui/material';
// import NumericFormatInput from '../ui/numericFormatInput'

const EventAddnewDialog = ({ open, onClose}) => {

    const handleChange = (event) => {};
    const handleSubmit = (event) => {};
    const handleInspPhoto = (event) => {};
    const handleDisplayPhoto = (event) => {};
    const handleClose = (event) => {};
    const handleKeyDown = (event) => {};


    return (
        <Dialog open={open} fullWidth>
            <DialogTitle>Event - Add New</DialogTitle>
            <DialogContent>

                <Stack direction='column' spacing={2} sx={{ mt: 1 }}>

                    {/* <Stack direction='row' spacing={2}>
                        <FormControl size='small' fullWidth sx={{ width: '50%' }}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                name='category'
                                value={newCar.category || ''}
                                onChange={handleChange}
                                input={<OutlinedInput label="Category" />}
                                MenuProps={MenuStyle}
                            >
                                {helper.getSelectOptions(OPTION.category).map(x => (
                                    <MenuItem key={x.value} value={x.value}>
                                        {x.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl size='small' fullWidth sx={{ width: '50%' }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                name='status'
                                value={newCar.status || ''}
                                onChange={handleChange}
                                input={<OutlinedInput label="Status" />}
                                MenuProps={MenuStyle}
                            >
                                {helper.getSelectOptions(OPTION.status).map(x => (
                                    <MenuItem key={x.value} value={x.value}>
                                        {x.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Stack> */}

                    {/* <Stack direction='row' spacing={2}>

                        <FormControl size='small' fullWidth sx={{ width: '50%' }}>
                            <InputLabel>Source*</InputLabel>
                            <Select
                                name='source'
                                value={newCar.source || ''}
                                onChange={handleChange}
                                input={<OutlinedInput label="Source" />}
                                MenuProps={MenuStyle}
                                error={error.source}
                                helperText={error.source ? "Source is required" : ""}
                            >
                                {helper.getSelectOptions(OPTION.source).map(x => (
                                    <MenuItem key={x.value} value={x.value}>
                                        {x.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth size='small' sx={{ width: '50%' }}>
                            <InputLabel>PIC</InputLabel>
                            <Select
                                name='pic'
                                value={newCar.pic || ''}
                                onChange={handleChange}
                                input={<OutlinedInput label="PIC" />}
                                MenuProps={MenuStyle}
                            >
                                {pic.map(item => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Stack> */}

                    <Stack direction='row' spacing={2}>
                        <TextField
                            size='small'
                            fullWidth
                            label="Seller Name"
                            name='name'
                            onChange={handleChange}
                            autoComplete='off'
                        />

                        <TextField
                            size='small'
                            fullWidth
                            label="Seller Phone"
                            name='phone'
                            onChange={handleChange}
                            autoComplete='off'
                            onKeyDown={handleKeyDown}
                        />
                    </Stack>

                    {/* <Stack direction='row' spacing={2}>
                        <FormControl size='small' fullWidth>
                            <Autocomplete
                                name='make'
                                value={helper.getOptionValue(OPTION.make, newCar.make) || ''}
                                onChange={handleMakeChange}
                                inputValue={makeInputValue}
                                onInputChange={(event, newInputValue) => {
                                    setMakeInputValue(newInputValue);
                                }}
                                options={helper.getSelectOptions(OPTION.make).map(x => (
                                    {
                                        label: x.label,
                                        value: x.value
                                    }
                                ))}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} label='Make' />}
                                isOptionEqualToValue={(option, value) => option.label === value.label}
                            />
                        </FormControl>

                        <TextField
                            size='small'
                            fullWidth
                            label="Model"
                            name='model'
                            onChange={handleChange}
                            autoComplete='off'
                        />
                    </Stack> */}

                    <Stack direction='row' spacing={2}>

                        <TextField
                            size='small'
                            fullWidth
                            label="Year"
                            name='carYear'
                            onChange={handleChange}
                            type="number"
                            autoComplete='off'
                            inputProps={{ min: 0 }}
                        />

                        <TextField
                            size='small'
                            fullWidth
                            label="Prev Owner"
                            name='previousOwner'
                            onChange={handleChange}
                            type="number"
                            autoComplete='off'
                            inputProps={{ min: 0 }}
                        />

                    </Stack>

                    {/* <Stack direction='row' spacing={2}>
                        
                    <FormControl size='small' fullWidth>
                            <Autocomplete
                                name='colour'
                                value={helper.getOptionValue(OPTION.colour, newCar.colour) || ''}
                                onChange={handleColourChange}
                                inputValue={colourInputValue}
                                onInputChange={(event, newInputValue) => {
                                    setColourInputValue(newInputValue);
                                }}
                                options={helper.getSelectOptions(OPTION.colour).map(x => (
                                    {
                                        label: x.label,
                                        value: x.value
                                    }
                                ))}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} label='Colour' />}
                                isOptionEqualToValue={(option, value) => option.label === value.label}
                            />
                        </FormControl>

                        <TextField
                            size='small'
                            fullWidth
                            label="Mileage"
                            name='mileage'
                            onChange={handleChange}
                            inputProps={{ inputMode: 'numeric', prefix: '', suffix: ' km' }}
                            InputProps={{ inputComponent: NumericFormatInput }}
                            autoComplete='off'
                        />

                    </Stack> */}

                    <Stack direction='row' spacing={2}>

                        <TextField
                            size='small'
                            fullWidth
                            label="Quote"
                            name='quote'
                            onChange={handleChange}
                            inputProps={{ inputMode: 'numeric', prefix: '' }}
                            // InputProps={{ inputComponent: NumericFormatInput }}
                            autoComplete='off'
                        />

                        <TextField
                            size='small'
                            fullWidth
                            label="Consign Quote"
                            name='consignQuote'
                            onChange={handleChange}
                            inputProps={{ inputMode: 'numeric', prefix: '' }}
                            // InputProps={{ inputComponent: NumericFormatInput }}
                            autoComplete='off'
                        />

                    </Stack>

                    <Stack direction='row' spacing={2}>
                        <Box sx={{ p: 1 }}>
                            <Typography>Display Photo</Typography>
                            <input type="file" onChange={handleDisplayPhoto} multiple />
                        </Box>


                        <Box sx={{ p: 1 }}>
                            <Typography>Insp Photo</Typography>
                            <input type="file" onChange={handleInspPhoto} multiple />
                        </Box>
                    </Stack>

                </Stack>

            </DialogContent>
            <DialogActions>
                <Button variant='text' onClick={handleClose} >Cancel</Button>
                <Button variant='contained' autoFocus onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );

}

export default EventAddnewDialog;

