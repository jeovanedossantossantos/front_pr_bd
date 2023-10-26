import React, { MouseEvent, useState } from "react";

import { get } from "lodash";
import { Controller, useFormState } from "react-hook-form";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField as TextFieldMaterial } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField = ({ item, setValue, control }: any) => {
    const name = item.id;
    const { errors } = useFormState({
        control,
        name,
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };



    const error = get(errors, name);
    return <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
            <>
                <h1 style={{
                    fontSize: 14,
                    fontFamily: 'Poppins',

                }}>{item.title}</h1>
                <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel error={!!error} htmlFor="outlined-adornment-password">{item.label}</InputLabel>
                    <OutlinedInput
                        error={!!error}
                        // id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={onChange}
                        onBlur={onBlur}
                        endAdornment={
                            <InputAdornment position="end" >
                                <IconButton

                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {!showPassword ? <VisibilityOff style={{ color: !!error ? '#d32f2f' : "" }} /> : <Visibility style={{ color: !!error ? '#d32f2f' : "" }} />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={item.label}
                    />
                </FormControl>
            </>
        )}
        name={name}
    />
}

export default PasswordField