import styles from './ToDoComponent.module.css'
import { toDoSlice } from "../../redux/reducers/ToDoSlice"
import { setSortDescription, setSortCompleted } from '../../redux/reducers/SortSlice'
import { useAppDispatch, useAppSelector } from "../../redux/store"
import React, { useState, useEffect } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { IToDo } from "../../interfaces/IToDo"
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPencil, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { readableTimeConverter } from "../../utils/timeReadable"

const ToDoComponent: React.FC = () => {
    // State pro urceni, jestli jsou neaktualni ukoly
    const [completeExisting, setCompleteExisting] = useState<boolean>(false)

    // State pro input ukolu a casu
    const [text, setText] = useState<string>('')
    const [timeToDo, setTime] = useState<string>('')

    // Staty pro editace ukolu
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editingText, setEditingText] = useState<string>('')
    const [editingTime, setEditingTime] = useState<string>('')

    // Vytahnuti actions createru
    const {
        addToDo,
        removeFromToDo,
        updateToDo,
        comleteOrIncompleteToDo,
        filterByVisibilityToDo,
        makeVisibleAllToDo,
        removeAllCompleteToDo,
        sortToDo
    } = toDoSlice.actions

    // Dispatch slouzi pro vyvolaní potřebné funkce
    const dispatch = useAppDispatch()

    // Timto ziskavam potřebný to do seznam
    const toDoList = useAppSelector(state => state.toDoReducer)
    const sortDescription = useAppSelector(state => state.sortReducer)

    // Submit funkce
    const submit = (text: string, time: string) => {
        const data: IToDo = {
            id: Number(new Date),
            task: text,
            completed: false,
            visible: true,
            time: time
        }

        // Vyvolani funkce pridani do todo seznamu
        dispatch(addToDo(data))
    }

    // Funkce pro opravu
    const startEditing = (id: number, task: string, time: string) => {
        setEditingId(id)
        setEditingText(task)
        setEditingTime(time)
    };

    // Funkce pro potvrzeni opravy
    const submitEdit = () => {
        if (editingId !== null) {
            dispatch(updateToDo({ id: editingId, task: editingText, completed: false, visible: true, time: editingTime }));
            setEditingId(null)
            setEditingText('')
            setEditingTime('')
        }
    }

    // Funkce pro zmenu sortirovani a ulozeni vybranneho stavu do storu
    const changeSortToDo = (eventKey: string | null) => {
        if (eventKey) {
            dispatch(sortToDo(eventKey))
            switch (eventKey) {
                case 'time':
                    dispatch(setSortDescription('Time'))
                    break
                case 'additionOrder':
                    dispatch(setSortDescription('Addition Order'))
                    break
                case "alphabetical":
                    dispatch(setSortDescription('Alphabetical'))
                    break
                case "unalphabetical":
                    dispatch(setSortDescription('Unalphabetical'))
                    break
            }
        }
    }

    // Funkce pro filtrace dle aktualnosti
    const changeSortCompletedToDo = (sortCompleted: string) => {
        switch (sortCompleted) {
            case 'All':
                dispatch(makeVisibleAllToDo())
                dispatch(setSortCompleted('All'))
                break
            case 'Active':
                dispatch(filterByVisibilityToDo(false))
                dispatch(setSortCompleted('Active'))
                break
            case 'Completed':
                dispatch(filterByVisibilityToDo(true))
                dispatch(setSortCompleted('Completed'))
                break
        }
    }

    useEffect(() => {
        const hasCompleted = toDoList.some(todo => todo.completed)
        setCompleteExisting(hasCompleted)
    }, [toDoList]);

    return (
        <main className={styles.main}>
            <section className={styles.inputSection}>
                <input
                    type="text"
                    value={text}
                    className={styles.inputText}
                    placeholder="What needs to be done?"
                    onChange={e => setText(e.target.value)}
                />
                <input
                    type='datetime-local'
                    value={timeToDo}
                    className={styles.inputTime}
                    onChange={e => setTime(e.target.value)}
                />
                <Button
                    variant="primary"
                    onClick={() => submit(text, timeToDo)}
                    className={styles.button}
                >Add
                </Button>
            </section>
            <section className={styles.tasksSection}>
                {toDoList.length ?
                    <ul className={styles.tasks}>
                        {toDoList.map(({ id, task, completed, visible, time }, index) => (
                            <li
                                key={id}
                                className={styles.task}
                                style={visible ? {} : { display: 'none' }}
                            >
                                <div className={styles.taskContent} >
                                    {
                                        editingId === id ? (
                                            <>
                                                <div className={styles.taskText}>
                                                    {
                                                        completed ?
                                                            <FontAwesomeIcon icon={faCircleCheck} onClick={() => dispatch(comleteOrIncompleteToDo({ id, task, completed: false, visible, time }))} />
                                                            :
                                                            <FontAwesomeIcon icon={faCircle} onClick={() => dispatch(comleteOrIncompleteToDo({ id, task, completed: true, visible, time }))} />
                                                    }
                                                    <input
                                                        type="text"
                                                        value={editingText}
                                                        onChange={e => setEditingText(e.target.value)}
                                                        onKeyDown={e => e.key === 'Enter' && submitEdit()}
                                                    />
                                                </div>

                                                <input
                                                    type="datetime-local"
                                                    value={editingTime}
                                                    onChange={e => setEditingTime(e.target.value)}
                                                    className={styles.taskTime}
                                                />
                                            </>

                                        ) : (
                                            <>
                                                <div className={styles.taskText}
                                                    style={{
                                                        ... (completed ? { textDecoration: 'line-through' } : {}),
                                                        ... (visible ? {} : { display: 'none' })
                                                    }}
                                                >
                                                    {
                                                        completed ?
                                                            <FontAwesomeIcon icon={faCircleCheck} onClick={() => dispatch(comleteOrIncompleteToDo({ id, task, completed: false, visible, time }))} />
                                                            :
                                                            <FontAwesomeIcon icon={faCircle} onClick={() => dispatch(comleteOrIncompleteToDo({ id, task, completed: true, visible, time }))} />
                                                    }
                                                    {task}
                                                </div>
                                                <div className={styles.taskTime}
                                                    style={completed ? { textDecoration: 'line-through' } : {}}
                                                >
                                                    {isNaN(Number(readableTimeConverter(time)[0])) ? '-' : readableTimeConverter(time)}
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                                <div className={styles.icons}>
                                    <FontAwesomeIcon icon={faTrashCan} className={styles.icon} onClick={() => dispatch(removeFromToDo(index))} />
                                    {
                                        editingId === id ?
                                            <FontAwesomeIcon icon={faCheck} className={styles.icon} onClick={() => submitEdit()} />
                                            :
                                            <FontAwesomeIcon icon={faPencil} className={styles.icon} onClick={() => startEditing(id, task, time)} />
                                    }
                                </div>
                            </li>
                        ))}
                    </ul> :
                    <div className={styles.noTasks}>No tasks!</div>
                }
                <div className={styles.sortBar}>
                    <div className={styles.completedBar}>
                        <ul className={styles.completedBarSort}>
                            <li
                                style={sortDescription.sortCompleted === 'All' ? { border: 'solid 1px', borderRadius: '0.5rem' } : {}}
                                onClick={() => changeSortCompletedToDo('All')}
                            >
                                All
                            </li>
                            <li
                                style={sortDescription.sortCompleted === 'Active' ? { border: 'solid 1px', borderRadius: '0.5rem' } : {}}
                                onClick={() => changeSortCompletedToDo('Active')}
                            >
                                Active
                            </li>
                            <li
                                style={sortDescription.sortCompleted === 'Completed' ? { border: 'solid 1px', borderRadius: '0.5rem' } : {}}
                                onClick={() => changeSortCompletedToDo('Completed')}>
                                Completed
                            </li>
                        </ul>
                        {
                            completeExisting &&
                            <div onClick={() => dispatch(removeAllCompleteToDo())}>Clear completed</div>
                        }
                    </div>
                    <div className={styles.taskSort}>
                        <label>Sort by:</label>
                        <Dropdown onSelect={changeSortToDo} >
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className={styles.taskSortList}>
                                {sortDescription.sortDescription}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="time">Time</Dropdown.Item>
                                <Dropdown.Item eventKey="additionOrder">Addition order</Dropdown.Item>
                                <Dropdown.Item eventKey="alphabetical">Alphabetical</Dropdown.Item>
                                <Dropdown.Item eventKey="unalphabetical">Unalphabetical</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </section>
        </main >
    )
};

export default ToDoComponent