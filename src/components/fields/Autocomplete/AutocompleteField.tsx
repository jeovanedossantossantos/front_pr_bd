import React, { useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Controller, useFormState } from 'react-hook-form';
import { get } from 'lodash';

const AutocompleteField = ({ item, setValue, control }: any) => {
    const name = item.id;
    const { errors } = useFormState({
        control,
        name,


    });

    useEffect(() => {
        setValue(item.id, item.value);
    }, []);
    const error = get(errors, name);


    return <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }: any) => (
            <>
                <h1 style={{
                    fontSize: 14,
                    fontFamily: "Poppins",
                }}>{item.title}</h1>
                <Autocomplete
                    fullWidth
                    defaultValue={item?.value}



                    onChange={(e, newValue) => {
                        onChange(newValue)
                        if (!item?.action) return
                        item?.action(newValue)
                    }}
                    onBlur={onBlur}
                    disablePortal
                    // id="combo-box-demo"
                    options={item.options}
                    // sx={{ width: 300 }}
                    renderInput={(params) => <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        onChange={onChange}
                        style={{
                            height: item?.multiline && 100,
                        }}
                        onBlur={onBlur}
                        label={item.label}
                        error={!!error}
                        required={item?.required}
                        multiline={item?.multiline}
                        value={item?.value}
                    />}
                />
            </>
        )}
        name={name}
    />
}

export default AutocompleteField