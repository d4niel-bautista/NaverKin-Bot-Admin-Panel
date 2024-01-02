import { Button, Grid } from '@mui/material';
import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React from 'react';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const StartAutoanswerBotToolbarComponent = ({ startAutoanswerBot, rowSelectionModel, connectionInfo, loadingState }) => {
    return (
        <GridToolbarContainer>
            <Grid container columnSpacing={12} rowSpacing={2}>
                <Grid item xs={6} sm={6} md={6} xl={6} >
                    <Button
                        color="primary"
                        size='small'
                        startIcon={<KeyboardDoubleArrowUpIcon />}
                        sx={{ fontWeight: 'bold' }}
                        onClick={startAutoanswerBot}
                        disabled={!connectionInfo["VM_id"] || connectionInfo["is_active"] === 2 || !rowSelectionModel.length || loadingState}
                    >
                        Start
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={6} xl={6} container justifyContent="flex-end">
                    <GridToolbarQuickFilter />
                </Grid>
            </Grid>
        </GridToolbarContainer>
    );
};

export default StartAutoanswerBotToolbarComponent;