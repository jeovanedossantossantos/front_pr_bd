import React, { useEffect, useState } from 'react';
import { api } from 'src/api';
import TableImovel from './components/Tabel';
import { Alert, Button, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Autocomplete from "@mui/material/Autocomplete";
import { cidades } from './cidades';

const ListarImovel = () => {

    const [imovel, setImovel] = useState([])
    const [vmin, setVmin] = useState<number>(0)
    const [vmax, setVmax] = useState<number>(0)
    const [alert, setAlert] = useState<string>('')
    const [uf, setUf] = useState<string>('');
    const [cidade, setCidade] = useState<any>('')
    const [rua, setRua] = useState<string>('')


    const todosImovel = async () => {
        const response = await api.get("/imovel")
        setImovel(response.data)
    }
    const imovelPorPreco = async () => {
        if (vmin > vmax) {
            setAlert("Erro! O valor minimo é maior que o valo maximo!")
            return

        }
        if (vmin < 0) {
            setAlert("Erro! O valor minimo é menor que zero!")
            return
        }
        if (vmax < 0) {
            setAlert("Erro! O valor maximo é menor que zero!")
            return
        }
        try {
            const response = await api.get(`/imovel/preco/?vmin=${vmin}&vmax=${vmax}`)

            setImovel(response.data)
        } catch (err) {
            setImovel([])
        }


    }
    const imovelPorEndereco = async () => {
        try {
            const response = await api.get(`/imovel/endereco/?cidade=${cidade}&estado=${uf}&rua=${rua}`)
            console.log(response.data)

            setImovel(response.data)
        } catch (err) {
            setImovel([])
        }



    }



    useEffect(() => {
        todosImovel()
    }, [])


    return <div style={{
        margin: 10
    }}>
        {
            alert.length > 0 && <Alert severity="error" style={{ position: "absolute", }}>{alert}</Alert>
        }

        <div>
            <Typography variant="h6" gutterBottom component="div">
                Filtros
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div style={{ width: 200 }}>
                    <Typography padding={1}>Buscar por preço</Typography>
                    <div style={{ padding: 5 }}>
                        <TextField id="standard-number"
                            label="Minimo"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            // value={vmin}
                            style={{ padding: 1 }}
                            onChange={(e: any) => setVmin(Number(e.target.value)
                                // < 0 ? 0 : e.target.value
                            )} />
                        <TextField id="standard-number"
                            label="Maximo"
                            type="number"
                            style={{ padding: 1 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            // value={vmax}
                            variant="standard" onChange={(e: any) => setVmax(
                                // e.target.value < vmin ? 
                                Number(e.target.value)
                                // + 1 : e.target.value
                            )} />
                    </div>
                    <Button onClick={imovelPorPreco} variant="contained" endIcon={<SendIcon />}>
                        Aplicar
                    </Button>


                </div>
                <div style={{
                    alignItems: "start"
                }}>
                    <Typography padding={1}>Buscar por Endereço</Typography>
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <Autocomplete

                                disablePortal
                                id="combo-box-demo"
                                options={estados}
                                sx={{ width: 90, padding: 1 }}
                                onChange={(_event, value) => setUf(value !== null ? value.label : '')}
                                renderInput={(params) => <TextField {...params} label="Estado" />}
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={uf ? cidades[uf] : Object.values(cidades).reduce((acc: any, curr: any) => acc.concat(curr), [])}
                                sx={{ width: 190, padding: 1 }}
                                onChange={(_event, value) => setCidade(value ? value : '')}
                                renderInput={(params) => <TextField {...params} label="Cidades" />}
                            />
                        </div>
                        <TextField sx={{ width: 300, padding: 1 }} id="outlined-basic" value={rua} label="Rua" variant="outlined"
                            onChange={(e) => setRua(e.target.value)}
                        />
                    </div>
                    <Button onClick={imovelPorEndereco} variant="contained" endIcon={<SendIcon />}>
                        Aplicar
                    </Button>
                </div>

            </div>
        </div>

        <TableImovel imovel={imovel} />
        {imovel.length === 0 && <Typography variant="h6" gutterBottom component="div">
            Nenhum imovel encontrado!
        </Typography>}


    </div>
}
const estados = [
    { label: "AC" },
    { label: "AL" },
    { label: "AP" },
    { label: "AM" },
    { label: "BA" },
    { label: "CE" },
    { label: "DF" },
    { label: "ES" },
    { label: "GO" },
    { label: "MA" },
    { label: "MT" },
    { label: "MS" },
    { label: "MG" },
    { label: "PA" },
    { label: "PB" },
    { label: "PR" },
    { label: "PE" },
    { label: "PI" },
    { label: "RJ" },
    { label: "RN" },
    { label: "RS" },
    { label: "RO" },
    { label: "RR" },
    { label: "SC" },
    { label: "SP" },
    { label: "SE" },
    { label: "TO" }
];
export default ListarImovel