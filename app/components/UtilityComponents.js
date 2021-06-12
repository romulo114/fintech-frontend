import React from "react";
import {Form, Button} from "react-bootstrap";
import {postModelDetails} from "../utils/api";

export function EditableCell(
    {
        value: initialValue, row: {index}, column: {id}, updateMyData, // This is a custom function that we supplied to our table instance
    }
) {
    // // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <input value={value} onBlur={onBlur} onChange={onChange}/>

}

export function EditableCheckbox(
    {
        value: initialValue, row: {index}, column: {id}, updateMyData // This is a custom function that we supplied to our table instance
    }
) {
    // // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <Form>
        <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Mark for Deletion" value={value}
                        onClick={() => updateMyData(index, id, value)}/>
        </Form.Group></Form>

}

export function LoadingForm(props) {
    const [form, setForm] = React.useState({})
    const [errors, setErrors] = React.useState({})
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const findFormErrors = () => {
        const {name} = form
        const newErrors = {}
        // name errors
        if (!name || name === '') newErrors.name = 'cannot be blank!'
        else if (name.length > 30) newErrors.name = 'name is too long!'
        return newErrors
    }

    const handleSubmit = e => {
        e.preventDefault()
        // get our new errors
        const newErrors = findFormErrors()
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors)
        } else {
            // No errors! Put any logic here for the form submission!
            postModelDetails(props.model.id, form).then((response) =>
                alert("Updated!"))
        }
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' onChange={e => setField('name', e.target.value)}
                              isInvalid={!!errors.name} placeholder={props.model.label}/>
                <Form.Control.Feedback type='invalid'>
                    {errors.name}
                </Form.Control.Feedback>
            </Form.Group>
            <Button type='submit'>Update Model Name</Button>
        </Form>
    );
}