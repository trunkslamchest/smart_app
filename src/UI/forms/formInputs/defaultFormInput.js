import React from 'react'

const DefaultFormInput = (props) => {

  let input

  if(!!props.options) {
    input =
        <select
          className={ props.selectClass || 'default_form_select' }
          disabled={ !props.enableInput }
          id={ props.id }
          name={ props.name }
          onChange={ props.onChange }
          value={ props.value }
        >
        {/* { !!props.country && props.country !== 'null' &&
          <img
            alt={ props.country }
            className='edit_div_flag_img'
            src={ flagIconIndex[props.country].image }
          />
        } */}
        { props.name !== "country" &&
          props.options.map((option, index) =>
            <option
              className={ props.selectOptionClass || 'default_form_select_option' }
              key={ index }
              value={ option }
            >
              { option }
            </option>
        )}
        { props.name === "country" && Object.entries(props.options).map((option, index) =>
          <option
            className={ props.selectOptionClass || 'default_form_select_option' }
            key={ index }
            value={ option[0] }
          >
            { option[0] }
          </option>
        )}
      </select>
  } else {
    if(props.type === 'textarea') {
      input =
        <textarea
          className={ props.className ? props.className : null }
          disabled={ !props.enableInput }
          id={ props.id }
          maxLength={ props.max }
          minLength={ props.min }
          name={ props.name }
          onChange={ props.onChange ? props.onChange : null }
          placeholder={ props.placeholder ? props.placeholder : null }
          rows={ props.rows }
          value={ props.value ? props.value : '' }
        />
    } else if(props.type === 'file') {
      input =
        <div className={ props.imageSubContainerClass || 'default_form_image_sub_container' }>
          <img
            alt={ props.imgAlt }
            id={ props.imgId }
            className={ props.imgClass || 'default_form_image' }
            name={ props.imgName }
            title={ props.imgTitle }
            src={ props.img }
          />
          <label className={ props.labelClass || 'default_form_image_button_label' }>
            <input
              accept={ props.accept }
              id={ props.id }
              multiple={ props.multiple }
              onChange={ props.onChange }
              type={ props.type }
            />
            <span>{ props.buttonText }</span>
          </label>
        </div>
    } else {
      input =
        <input
          className={ props.className ? props.className : null }
          disabled={ !props.enableInput }
          id={ props.id }
          max={ props.max ? props.max : null }
          min={ props.min ? props.min : null }
          name={ props.name }
          onChange={ props.onChange ? props.onChange : null }
          onClick={ props.onClick ? props.onClick : null }
          placeholder={ props.placeholder ? props.placeholder : null }
          type={ props.type }
          value={ props.value ? props.value : '' }
        />
    }
  }

  return(<>{ input }</>)
}

export default DefaultFormInput