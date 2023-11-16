import React, { useEffect, useState } from 'react';
import { SERVER } from '../../App';
import { useOutletContext } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import AddDeleteToolbar from './AddDeleteToolbar';
import AlertDialog from '../Alerts/AlertDialog';
import { TextField } from '@mui/material';

const columns = [{ field: 'category', headerName: 'Category', width: 100, editable: true }];

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [selected, setSelectedRows] = useState([]);
    const [addDialog, setAddDialog] = useState({ open: false, title: 'Add Category', description: 'Enter category name below:' });
    const [token] = useOutletContext();

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch(SERVER + "/categories", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCategories(data.shift() ? data : []);
            }
        }
        fetchCategories();
    }, []);

    const handleRowSelectionModelChange = (newRowSelectionModel) => {
        const selectedRows = newRowSelectionModel.map((id) => {
            const item = categories.find((category) => category.id === id);
            return item.category;
        });
        setSelectedRows(selectedRows.sort());
        setRowSelectionModel(newRowSelectionModel);
    }

    const handleAdd = () => {
        setAddDialog(addDialog => ({ ...addDialog, open: true }));
    };

    const submitNewCategory = async () => {
        if (newCategory === '') {
            return;
        }

        const response = await fetch(SERVER + "/categories", {
            method: "POST", body: JSON.stringify({ 'category': newCategory }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        });

        if (response.ok) {
            const data = await response.json();
            setCategories(categories => [...categories, data]);
        }

        setAddDialog(addDialog => ({ ...addDialog, open: false }))
        setNewCategory('');
    };

    const onRowUpdate = async (updatedRow, originalRow) => {
        if (updatedRow.category === '') {
            return originalRow;
        }
        const response = await fetch(SERVER + "/categories", {
            method: "PATCH", body: JSON.stringify(updatedRow),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        });

        if (response.ok) {
            return updatedRow;
        } else {
            return originalRow;
        }
    };

    const textField = <TextField sx={{ marginTop: 2 }} value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />;
    return (
        <>
            <AlertDialog handleClose={() => setAddDialog(addDialog => ({ ...addDialog, open: false }))} alertDialog={addDialog} handleConfirm={submitNewCategory} component={textField} />
            <DataGrid
                rows={categories}
                columns={columns}
                slots={{
                    pagination: null,
                    toolbar: AddDeleteToolbar
                }}
                slotProps={{
                    toolbar: {
                        selected,
                        handleAdd
                    },
                }}
                checkboxSelection
                disableRowSelectionOnClick
                rowSelectionModel={rowSelectionModel}
                onRowSelectionModelChange={handleRowSelectionModelChange}
                processRowUpdate={onRowUpdate}
                onProcessRowUpdateError={(error) => console.log(error)}
                sx={{
                    '.MuiDataGrid-columnHeaders': {
                        backgroundColor: '#e7e5e1',
                    },
                    '.MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold'
                    }, maxWidth: '30vw', height: '60vh'
                }}
            />
        </>
    );
};

export default Categories;