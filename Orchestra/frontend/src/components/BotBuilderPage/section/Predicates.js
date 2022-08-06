import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { sessionStorage_get } from '../../../utils/store/store';
// Components
import SmallHeader from '../../Header/SmallHeader';
// Style
import '../BotBuilderPage.css';
import { Button, Input, Modal, Select } from 'antd';
import { DiHaskell } from 'react-icons/di';
import { MdAddCircleOutline } from 'react-icons/md';

const { Option } = Select;

function Predicates({ addedPredecates, onSave }) {
    const [DisplayModal, setDisplayModal] = useState(false);
    const [Predicates, setPredicates] = useState([]);
    const [LoadedPredicates, setLoadedPredicates] = useState([]);
    const [SelectedLoadedPredicate, setSelectedLoadedPredicate] = useState(null);
    const [PredicateName, setPredicateName] = useState("");
    const [Description, setDescription] = useState("");
    const [DisplayPredicateModal, setDisplayPredicateModal] = useState(false);
    const [SelectedPredicate, setSelectedPredicate] = useState(null);

    useEffect(() => {
        axios.get(`http://www.localhost:3014/api/predicates/getViaUserId/${JSON.stringify(sessionStorage_get("auth").localId)}`)
            .then(response => {
                if (response.data.success) {
                    let predicateData = response.data.predicatesData;
                    predicateData.filter(predicate => { return (!predicate.eventId || predicate.eventId === "") });
                    setLoadedPredicates(predicateData);
                } else {
                    console.log("Failed to add predicate");
                }
            });
    }, []);

    const onAddPredicate = () => {
        if (!sessionStorage_get("auth")) alert("Failed to load user data");
        else setDisplayModal(true);
    };

    const userPredicates = LoadedPredicates && LoadedPredicates !== []
        ? LoadedPredicates.map((p, index) => {
            return (
                <Option key={index} value={index}>{p.name}</Option>
            );
        }): undefined;

    const onUserPredicate = (value) => {
        if (value < 0) setSelectedLoadedPredicate(null);
        else setSelectedLoadedPredicate(LoadedPredicates[value]);
    };

    const onPredicateName = (event) => {
        if (event.target) setPredicateName(event.target.value);
        else setPredicateName("");
    };

    const onDescription = (event) => {
        if (event.target) setDescription(event.target.value);
        else setDescription("");
    };

    const onCancelModal = () => {
        setPredicateName("");
        setDescription("");
        setDisplayModal(false);
    };

    const addPredicate = () => {
        if (SelectedLoadedPredicate) {
            let predicates = Predicates;
            predicates.push(SelectedLoadedPredicate);
            setPredicates(predicates);
            onSave(predicates);
            setSelectedLoadedPredicate(null);
            alert("Successfully Added!");
            setDisplayModal(false);
            return;
        }
        let variables = {
            name: PredicateName,
            descriptor: Description,
            userId: JSON.stringify(sessionStorage_get("auth").localId),
            eventId: "",
        };
        axios.post(`http://www.localhost:3014/api/predicates/addPredicate`, variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    let predicates = Predicates;
                    variables.predicateId = response.data.predicateData.upsertedId;
                    predicates.push(variables);
                    setPredicates(predicates);
                    onSave(predicates);
                    alert("Successfully Added!");
                    setDisplayModal(false);
                } else {
                    console.log("Failed to add predicate");
                }
            });
    };

    const onPredicate = (index) => {
        console.log(index);
        setDisplayPredicateModal(true);
        setSelectedPredicate(index);
    };

    const onCancel = () => {
        setDisplayPredicateModal(false);
        onPredicateName("");
        onDescription("");
        setSelectedPredicate(null);
    };

    const deletePredicate = () => {
        const predicateId = Predicates[SelectedPredicate]._id;
        console.log(Predicates);
        axios.delete(`http://www.localhost:3014/api/predicates/deletePredicate/${predicateId}`)
            .then(response => {
                if (response.data.success) {
                    alert("Successfully deleted!");
                    // Remove
                    let predicates = Predicates;
                    predicates.splice(SelectedPredicate, 1);
                    setPredicates(predicates);
                    onSave(predicates);
                    // Reset
                    setDisplayPredicateModal(false);
                    setSelectedPredicate(null);
                    setPredicateName("");
                    setDescription("");
                } else {
                    console.log("Failed to delete predicate");
                }
            });
    };

    const updatePredicate = () => {
        const variables = Predicates[SelectedPredicate];
        if (PredicateName !== "") variables.name = PredicateName;
        if (Description !== "") variables.descriptor = Description;
        axios.post(`http://www.localhost:3014/api/predicates/updatePredicate`, variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    let predicates = Predicates;
                    predicates[SelectedPredicate] = variables;
                    setPredicates(predicates);
                    onSave(predicates);
                    alert("Successfully Updated!");
                    setDisplayPredicateModal(false);
                } else {
                    console.log("Failed to add predicate");
                }
            });
    };

    const predicates = Predicates ? Predicates.map((row, index) => {
        return (
            <div key={index} className="applet predicates" onClick={() => onPredicate(index)}>
                <DiHaskell />
                <div>
                    <h3>{row.name}</h3>
                    <p>{row.descriptor}</p>
                </div>
            </div>
        );
    }) : undefined;

    return (
        <div className="bot-event-blocks">
            <Modal 
                title="Add a new predicate" 
                visible={DisplayModal} 
                destroyOnClose={true}
                onOk={addPredicate} 
                onCancel={onCancelModal}
                footer={[
                    <Button key="back" onClick={onCancelModal}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={addPredicate}>
                        Submit
                    </Button>
                ]}
                className="predicate-modal"
            >
                <p>Choose Your Predicate</p>
                <Select style={{ width: "100%" }} onChange={onUserPredicate} className="predicate-input">
                    <Option value={-1}>N/A</Option>
                    {userPredicates}
                </Select>
                <p>Predicate Name</p>
                <Input 
                    placeholder="Predicate Name"
                    onChange={onPredicateName}
                    className="predicate-input"
                />
                <p>Predicate Description</p>
                <Input 
                    placeholder="Description"
                    onChange={onDescription}
                    className="predicate-input"
                />
            </Modal>
            <Modal                     
                title="Predicate" 
                visible={DisplayPredicateModal} 
                destroyOnClose={true}
                onOk={updatePredicate} 
                onCancel={onCancel}
                footer={[
                    <Button key="delete" type="primary" danger onClick={deletePredicate}>
                        Delete
                    </Button>,
                    <div>
                        <Button key="back" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button key="submit" type="primary" onClick={updatePredicate}>
                            Submit
                        </Button>
                    </div>
                ]}
                className="predicate-update-modal"
            >
                <p>Predicate Name</p>
                <Input 
                    placeholder="Predicate Name"
                    defaultValue={Predicates && Predicates[SelectedPredicate] && Predicates[SelectedPredicate].name}
                    onChange={onPredicateName}
                    className="predicate-input"
                />
                <p>Predicate Description</p>
                <Input 
                    placeholder="Description"
                    defaultValue={Predicates && Predicates[SelectedPredicate] && Predicates[SelectedPredicate].descriptor}
                    onChange={onDescription}
                    className="predicate-input"
                />
                <p>Predicate ID</p>
                <Input 
                    placeholder="Predicate ID"
                    defaultValue={Predicates && Predicates[SelectedPredicate] && Predicates[SelectedPredicate].predicateId}
                    onChange={onDescription}
                    className="predicate-input"
                    disabled
                />
            </Modal>
            <SmallHeader title="Predicates" />
            <div className="applet-list">
                <div className="added-applet">{predicates}</div>
                <div className="applet save" onClick={onAddPredicate}>
                    <MdAddCircleOutline />
                    <div><h3>Add a new predicate</h3></div>
                </div>
            </div>
        </div>
    );
}

export default Predicates;