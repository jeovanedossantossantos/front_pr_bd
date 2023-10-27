import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Avatar } from '@mui/material';


import MobileStepper from '@mui/material/MobileStepper';

import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import moment from 'moment';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


function SwipeableTextMobileStepper({ images }: any) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: any) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                }}
            >
                <Typography>Imagem {activeStep + 1}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {images?.map((step: string, index: number) => {

                    return <div key={index}>
                        {/* {Math.abs(activeStep - index) <= 2 ? ( */}

                        <img

                            alt=''

                            style={{
                                height: 255,
                                display: 'block',
                                maxWidth: 400,
                                overflow: 'hidden',
                                width: '100%',
                            }}
                            src={step}

                        />
                        {/* ) : null} */}
                    </div>
                })}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );
}



function Row(props: any) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell component="th" scope="row">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt="Remy Sharp"
                            style={{ marginRight: 5 }}

                            src={row.fotos[0]} />
                        {moment(row.data_construcao).format('YYYY-MM-DD')}
                    </div>
                </TableCell>

                <TableCell align="right">{row.venda === 0 ? "Não" : "Sim"}</TableCell>
                <TableCell align="right">{row.locacao === 0 ? "Não" : "Sim"}</TableCell>
                <TableCell align="right">{row.disponivel === 0 ? "Não" : "Sim"}</TableCell>
                <TableCell align="right">{row.venda === 0 ? "Indisponivel" : "R$ " + row.valor_venda}</TableCell>
                <TableCell align="right">{row.locacao === 0 ? "Indisponivel" : "R$ " + row.valor_locacao}</TableCell>

            </TableRow>
            <TableRow >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} >
                    <Collapse in={open} timeout="auto" unmountOnExit >
                        <Box sx={{ margin: 1, }} >
                            <Typography variant="h6" gutterBottom component="div">
                                Informações
                            </Typography>
                            <Table size="small" aria-label="purchases" >

                                {/* <TableBody > */}


                                {/* <TableRow > */}
                                <TableCell style={{ width: "400px" }}>
                                    <SwipeableTextMobileStepper images={row.fotos} />
                                </TableCell>
                                <TableCell>

                                    <Typography variant="h5" gutterBottom component="div">
                                        Endereço
                                    </Typography>

                                    <TableRow>

                                        <TableCell style={{ fontSize: "18px" }}>Cidade</TableCell>
                                        <TableCell style={{ fontSize: "18px" }} >Bairro</TableCell>
                                        <TableCell style={{ fontSize: "18px" }} >Rua</TableCell>
                                        <TableCell style={{ fontSize: "18px" }} >Numero</TableCell>

                                    </TableRow>
                                    <TableBody >
                                        <TableCell style={{ fontSize: "14px" }} align="right">{row.endereco.cidade}</TableCell>
                                        <TableCell style={{ fontSize: "14px" }} align="right">{row.endereco.bairro}</TableCell>
                                        <TableCell style={{ fontSize: "14px" }} align="right">{row.endereco.rua}</TableCell>
                                        <TableCell style={{ fontSize: "14px" }} align="right">{row.endereco.numero}</TableCell>

                                    </TableBody>

                                </TableCell>

                                <TableCell>

                                    <Typography variant="h5" gutterBottom component="div">
                                        Descrição - {row.tipo}
                                    </Typography>

                                    {
                                        (row.tipo === "Casa" || row.tipo === "Apartamento") && <>

                                            <TableRow>

                                                <TableCell style={{ fontSize: "18px" }}>Quartos</TableCell>
                                                <TableCell style={{ fontSize: "18px" }} >Vagas na garagem</TableCell>
                                                <TableCell style={{ fontSize: "18px" }} >Área m<sup>2</sup></TableCell>

                                            </TableRow>
                                            <TableBody >
                                                <TableCell style={{ fontSize: "14px" }} align="right">{row.qtd_quartos}</TableCell>
                                                <TableCell style={{ fontSize: "14px" }} align="right">{row.qtd_vagas_garagem}</TableCell>
                                                <TableCell style={{ fontSize: "14px" }} align="right">{row.area_imovel}</TableCell>

                                            </TableBody>
                                        </>
                                    }
                                    {
                                        (row.tipo === "Sala Comercial") && <>

                                            <TableRow>

                                                <TableCell style={{ fontSize: "18px" }}>N° comodos</TableCell>
                                                <TableCell style={{ fontSize: "18px" }} >N° banheiros</TableCell>
                                                <TableCell style={{ fontSize: "18px" }} >Área m<sup>2</sup></TableCell>

                                            </TableRow>
                                            <TableBody >
                                                <TableCell style={{ fontSize: "14px" }} align="right">{row.qtd_quartos}</TableCell>
                                                <TableCell style={{ fontSize: "14px" }} align="right">{row.qtd_vagas_garagem}</TableCell>
                                                <TableCell style={{ fontSize: "14px" }} align="right">{row.area_imovel}</TableCell>

                                            </TableBody>
                                        </>
                                    }
                                    {
                                        (row.tipo === "Terreno") && <>

                                            <TableRow>

                                                <TableCell style={{ fontSize: "18px" }}>Largura</TableCell>
                                                <TableCell style={{ fontSize: "18px" }} >Comprimento</TableCell>
                                                <TableCell style={{ fontSize: "18px" }} >Área m<sup>2</sup></TableCell>

                                            </TableRow>
                                            <TableBody >
                                                <TableCell style={{ fontSize: "14px" }} align="right">{row.largura}</TableCell>
                                                <TableCell style={{ fontSize: "14px" }} align="right">{row.comprimento}</TableCell>
                                                <TableCell style={{ fontSize: "14px" }} align="right">{row.area_imovel}</TableCell>

                                            </TableBody>
                                        </>
                                    }



                                </TableCell>



                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>

            </TableRow>

        </>
    );
}



const TableImovel = ({ imovel }: any) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Data da construção</TableCell>
                        <TableCell align="right">Vende-se</TableCell>
                        <TableCell align="right">Aluga-se</TableCell>
                        <TableCell align="right">Disponivel</TableCell>
                        <TableCell align="right">Preço venda</TableCell>
                        <TableCell align="right">Preço aluguel</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {imovel?.map((row: any) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableImovel