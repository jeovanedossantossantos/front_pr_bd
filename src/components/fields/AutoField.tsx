import React from "react";

import TextField from "./TextField"
import PasswordField from "./PasswordField/PasswordField";
import CPFField from "./CPFField/CPFField";
import AutocompleteField from "./Autocomplete";
import PhoneCellField from "./PhoneCellField/PhoneCellField";

const AutoFields = ({ item, setValue, control }: any) => {

    const fields: any = {
        "text_field": (item: any) => (<TextField item={item} setValue={setValue} control={control} />),
        "email_field": (item: any) => (<TextField item={item} setValue={setValue} control={control} />),
        "password_field": (item: any) => (<PasswordField item={item} setValue={setValue} control={control} />),
        "cpf_field": (item: any) => (<CPFField item={item} setValue={setValue} control={control} />),
        "phone_field": (item: any) => (<PhoneCellField item={item} setValue={setValue} control={control} />),
        "auto_complete_field": (item: any) => (<AutocompleteField item={item} setValue={setValue} control={control} />),
    }
    return fields[item.type](item);

}

export default AutoFields