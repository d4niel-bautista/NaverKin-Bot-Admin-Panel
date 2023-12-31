import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { ServerAPIContext } from '../../context/ServerAPIProvider';
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
    const [token] = useContext(AuthContext);
    const [serverAPI] = useContext(ServerAPIContext);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch(serverAPI + "/categories", {
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
        };
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

    const handleDelete = async () => {
        const response = await fetch(serverAPI + "/categories", {
            method: "DELETE",
            body: JSON.stringify(rowSelectionModel),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        });

        const data = await response.json();
        if (response.ok) {
            setCategories(categories.filter((category) => !data.success_delete.includes(category.category)));
        }
    };

    const submitNewCategory = async () => {
        if (newCategory === '') {
            return;
        }

        const response = await fetch(serverAPI + "/categories", {
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
        const response = await fetch(serverAPI + "/categories", {
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
                        handleAdd,
                        handleDelete
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