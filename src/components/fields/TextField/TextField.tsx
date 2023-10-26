import React, { useEffect } from "react";

import { get } from "lodash";
import { Controller, useFormState } from "react-hook-form";
import { TextField as TextFieldMaterial } from "@mui/material"

const TextField = ({ item, setValue, control }: any) => {
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
        render={({ field: { onChange, onBlur, value } }) => (
            <>
                <h1 style={{
                    fontSize: 14,
                    fontFamily: 'Poppins',
                }}>{item.title}</h1>
                <TextFieldMaterial
                    fullWidth
                    // id="outlined-basic"
                    label={item.label}
                    defaultValue={item?.value}
                    variant="outlined"
                    error={!!error}
                    required={item?.required}
                    multiline={item?.multiline}
                    onChange={onChange}
                    onBlur={onBlur}
                    style={{
                        height: item?.multiline && 100,
                    }}
                />
            </>
        )}
        name={name}
    />
}

export default TextField