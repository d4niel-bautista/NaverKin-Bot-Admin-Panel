import { TextField, MenuItem } from "@mui/material";

const AccountDetails = ({ account, onChange }) => {
    return (
        <>
            <TextField
                label="Username"
                fullWidth
                value={account.username || ''}
                onChange={(e) => onChange('username', e.target.value)}
                margin="normal"
            />
            <TextField
                label="Password"
                fullWidth
                value={account.password || ''}
                onChange={(e) => onChange('password', e.target.value)}
                margin="normal"
            />
            <TextField
                label="Recovery Email"
                fullWidth
                value={account.recovery_email || ''}
                onChange={(e) => onChange('recovery_email', e.target.value)}
                margin="normal"
            />
            <TextField
                label="Name"
                fullWidth
                value={account.name || ''}
                onChange={(e) => onChange('name', e.target.value)}
                margin="normal"
            />
            <TextField
                label="Date of Birth"
                fullWidth
                type="date"
                value={account.date_of_birth || ''}
                onChange={(e) => onChange('date_of_birth', e.target.value)}
                margin="normal"
            />
            <TextField
                label="Gender"
                fullWidth
                select
                value={account.gender || ''}
                onChange={(e) => onChange('gender', e.target.value)}
                margin="normal"
            >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
            </TextField>
            <TextField
                label="Mobile Number"
                fullWidth
                value={account.mobile_no || ''}
                onChange={(e) => onChange('mobile_no', e.target.value)}
                margin="normal"
            />
            <TextField
                label="Profile URL"
                fullWidth
                value={account.account_url || ''}
                onChange={(e) => onChange('account_url', e.target.value)}
                margin="normal"
            />
        </>
    );
};

export default AccountDetails;