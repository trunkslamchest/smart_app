import React from 'react'

import DefaultFormInput from '../../../UI/components/input/defaultFormInput'
import DefaultFormError from '../../../UI/components/errors/defaultFormError'

const distribDashboardEditProfileInputs = (props, field, index) => {
  let fieldValue = field.val

  if(field.type === 'text' || field.type === 'textarea') {
    if(props[field.id] === 'null') fieldValue = field.placeholder
    else fieldValue = props[field.id]
  }

  if(field.type === 'number') {
    if(props.dob[field.id] === 0) fieldValue = field.val
    else fieldValue = props.dob[field.id]
  }

  return (
    <div key={ index.toString() + (field.label || field.id) }>
      { !!field.label && <h3>{ field.label }</h3> }
      { Object.values(field).length !== 1 &&
        <>
          <DefaultFormInput
            accept={ field.accept }
            buttonText={ field.buttonText }
            enableInput={ props.enableInput }
            className={ 'edit_profile' }
            label={ field.label }
            id={ field.id }
            imgAlt={ field.imgAlt }
            imgId={ field.imgId }
            imgClass={ field.imgClass }
            imgName={ field.imgName }
            imgTitle={ field.imgTitle }
            img={ field.img }
            key={ (index + 10).toString() + (field.label || field.id) }
            labelClass={ field.labelClass }
            max={ field.max }
            min={ field.min }
            multiple={ field.multiple }
            name={ field.name }
            onChange={ field.onChange }
            options={ field.options }
            placeHolder={ field.placeHolder }
            rows={ field.rows }
            type={ field.type }
            value={ fieldValue }
          />
          { props.form[field.id] && !!props.form[field.id].errors.length &&
            <div className="default_form_error_container">
              { props.form[field.id].errors.map((error, index) => <DefaultFormError key={ index } error={ error } />) }
            </div>
          }
          { props.errors[field.id] &&
            <div className="default_form_error_container">
              { props.errors[field.id].map((error, index) => <DefaultFormError key={ index } error={ error } />) }
            </div>
          }
        </>
      }
    </div>
  )
}

export default distribDashboardEditProfileInputs