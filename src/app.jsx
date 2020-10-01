import React from 'react'
import {Formik , useField , Form} from 'formik'
import * as Yup from 'yup'

const CoustTextInput = ({label , ...props}) => {
const [filed , meta ] = useField(props)
return(
<>
<label htmlFor={props.id || props.name}>{label}</label>
<input type="text" {...filed} {...props}/>
{meta.touched && meta.error ? (
    <div>
        {meta.error}
    </div>
):null}
</>


)
}




const Coustcheckboxt = ({children , ...props}) => {

    const [filed , meta ] = useField(props,'checkbox')
    return(
    <>
    <label>
    <input type="checkbox" {...filed} {...props}/>
    {children}
    </label>
    {meta.touched && meta.error ? (
        <div>
            {meta.error}
        </div>
    ):null}
    </>
    
    
    )
    }


    const CoustSelect = ({label , ...props}) => {
        const [filed , meta ] = useField(props)
        return(
        <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...filed} {...props}/>
        {meta.touched && meta.error ? (
            <div>
                {meta.error}
            </div>
        ):null}
        </>
        
        
        )
        }





function App() {
    return (

        <Formik

    initialValues={{
      name:'',
      email:'',
      accsepts:false,
      powerSpecl:''
    }}

    validationSchema={Yup.object({
        name:Yup.string()
        .min(3,"sorry not inpout / enter world 3 > ")
        .max(15,"sorry not up 15 number world input / enter")
        .required('Required'),
        
        email:Yup.string()
        .email('plees enter email addres true')
        .required('Required'),

        accsepts:Yup.boolean()
        .required('Required')
        .oneOf([true],'you monts value'),

        powerSpecl:Yup.string()
        .oneOf(['filght','nonoe','wow'],'sorry power')
        .required('Required'),

    })}
    onSubmit={(values , {setsubmitvalues , restform})=>{
        setTimeout(() => {
            
            alert(JSON.stringify(values,null,2))
            restform()
            setsubmitvalues(false)

        }, 3000);
    }}
    >

 {props => (
<Form>
    <h1> lol </h1>
    <CoustTextInput label="Name" name="name" type="text" />
    <CoustTextInput label="Email" name="email" type="email" />
    <CoustSelect label="Selects" name="selects">
        <option value="lorem1">select lorem1 </option>
        <option value="lorem2">select lorem2 </option>
        <option value="lorem3">select lorem3 </option>

    </CoustSelect>
    <Coustcheckboxt name="accsept">
        Im accsept licence
    </Coustcheckboxt>
 <button type="submit">{props.isSubmitting ? 'loading...' : 'submit'}</button>
</Form>
 )}
      
    </Formik>
    )
}

export default App
