import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Logins from './Logins';
import { AuthContext } from '../../context/AuthProvider';
import { ServerAPIContext } from '../../context/ServerAPIProvider';
import AnswerResponses from './AnswerResponses';
import { Box, Tab, Tabs } from '@mui/material';
import QuestionPosts from './QuestionPosts';
import { groupObjectsByValue } from '../../utils/groupObjectsByValue';

const TabPanel = ({ value, index, children }) => {
    return (
        <div
            hidden={value !== index}
        >
            {value === index && children}
        </div>
    );
};

const ActivityLog = () => {
    const [token] = useContext(AuthContext);
    const [serverAPI] = useContext(ServerAPIContext);
    const [answerResponses, setAnswerResponses] = useState([]);
    const [questionPosts, setQuestionPosts] = useState([]);
    const [logins, setLogins] = useState([]);
    const groupedLogins = useRef();
    const mostRecentLogins = useRef();
    const [button, setButton] = useState(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const fetchActivities = async () => {
            const response = await fetch(serverAPI + "/activities", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAnswerResponses(data['answer_responses']);
                setQuestionPosts(data['question_posts']);

                const groupedByUsername = groupObjectsByValue(data['logins'], 'username');
                groupedLogins.current = groupedByUsername;

                const latestLogins = [];
                for (const userLogins of Object.values(groupedByUsername)) {
                    latestLogins.push(userLogins[userLogins.length - 1]);
                }
                mostRecentLogins.current = latestLogins;
                setLogins(latestLogins)
            }
        };
        fetchActivities();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const resetLoginsList = useCallback(() => {
        setLogins(mostRecentLogins.current);
    }, []);

    const viewLoginsHistory = useCallback((username) => {
        setLogins(groupedLogins.current[username]);
    }, []);

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Logins" />
                        <Tab label="Answer Responses" />
                        <Tab label="Question Posts" />
                    </Tabs>
                </Box>
            </Box>
            <TabPanel value={value} index={0}>
                <Logins logins={logins} resetLoginsList={resetLoginsList} viewLoginsHistory={viewLoginsHistory} button={button} setButton={setButton} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AnswerResponses answerResponses={answerResponses} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <QuestionPosts questionPosts={questionPosts} />
            </TabPanel>
        </>
    );
};

export default ActivityLog;