import React, { useEffect, useState } from "react";
import { IMaskInput } from 'react-imask';
import { get } from "lodash";
import { Controller, useFormState } from "react-hook-form";
import { TextField as TextFieldMaterial } from "@mui/material"


interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
    mask: string;
    defaultValue: string
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, mask, defaultValue, ...other } = props;


        return (
            <IMaskInput
                {...other}
                defaultValue={defaultValue}
                mask="000.000.000-00"
                onAccept={(value: any) =>
                    onChange({ target: { name: props.name, value } })
                }
            // overwrite
            />
        );
    }
);

const CPFField = ({ item, setValue, control, ...props }: any) => {
    const name = item.id;
    const [focus, setFocus] = useState(false)
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
                    {...props}
                    InputLabelProps={{ shrink: (value) || focus ? true : false }}
                    fullWidth
                    type="text"
                    // id="outlined-basic"
                    label={item.label}
                    defaultValue={value}
                    value={value}
                    variant="outlined"
                    error={!!error}
                    required={item?.required}
                    multiline={item?.multiline}
                    onChange={onChange}
                    onBlur={() => setFocus(false)}
                    onFocus={() => setFocus(true)}
                    style={{
                        height: item?.multiline && 100,
                    }}
                    InputProps={{
                        inputComponent: TextMaskCustom,
                    }}


                />
            </>
        )}
        name={name}
    />
}

export default CPFField