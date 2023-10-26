import React, { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { mapValues, set } from "lodash";

import { useForm } from "react-hook-form";
import * as z from "zod";
import AutoField from "./AutoField";
import { getFieldSchema } from "./schemas";
import { Grid, Button } from "@mui/material";

const Form = ({
    fields,
    onSubmit,
    children,
    textButton,
    locationButton = "center" || "flex-end" || "flex-start",
    height,
    noButton
}: any) => {

    const mapSchema: any = (value: any) => {

        if (value._def) {
            return value;
        }
        const newShape: any = mapValues(value, mapSchema);
        return z.object(newShape);
    };

    const schema = useMemo(() => {
        const objects = {};
        fields.map((row: any) => {
            if (row.validation.required === true) {
                return set(objects, row.id, getFieldSchema(row));
            }
            return null
        }
        );

        // {address: {zip_field: z.string()}}
        // mapValues -> {address: z.object({zip_field: z.string()})}
        return z.object(mapValues(objects, mapSchema));
    }, [fields]);

    const {
        control,
        formState: { isSubmitting, isValid },
        register,
        setValue,
        handleSubmit,



    } = useForm({
        defaultValues: {},
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        fields.map((item: { id: never }) => {
            if (item.id) register<never>(item.id);
        });
    }, [fields, register]);

    return (
        <Grid container style={{ justifyContent: 'center' }}>
            {
                fields.map((item: any, index: number) => {
                    return <Grid item={true} key={index} xs={item.spacing.xs} style={{ padding: 3 }}>
                        <AutoField item={item} setValue={setValue} control={control} />
                    </Grid>
                })
            }
            <Grid container item={true} xs={10} style={{
                justifyContent: locationButton,
                marginTop: 10,
            }}>

                <Button
                    disabled={isSubmitting || !isValid}
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{ width: 200 }}
                >{textButton ? textButton : "Salvar"}</Button>

            </Grid>

        </Grid>
    );

}

export default Form