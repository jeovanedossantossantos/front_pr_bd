import * as z from "zod";

export const getFieldSchema = (row: any) => {
    // Selecionar os tipos pra validar diferente

    if (row.type === "email_field") {
        return z
            .string()
            .min(1, "Email é um campo obrigatorio")
            .email({ message: "Email invalido" });
    }

    if (row.type === "phone_field") {
        return z.string().min(16, "Telefone é um campo obrigatorio");
    }
    if (row.type === "cpf_field") {
        return z.string().min(14, "CPF é um campo obrigatorio");
    }


    return z.string().min(1, "Campo obrigatorio");
};