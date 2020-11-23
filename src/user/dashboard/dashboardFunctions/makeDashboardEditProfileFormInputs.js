const makeDashboardEditProfileFormInputs = (
    onChange,
    onAvatarChange,
    onDOBChange,
    flagIconIndex,
    avatar,
    bio,
    country,
    dob,
    email,
    first_name,
    gender,
    genderPronouns,
    last_name,
    user_name,
    genders,
    gender_pronouns,
    months
  ) => {
    return [
      {
        accept: "image/*",
        buttonText: 'Choose A New Profile Picture',
        errorContainerClass: 'edit_profile_form_error_container',
        errorClass: 'edit_profile_form_error',
        id: 'avatar',
        imgAlt: 'edit_profile_avatar_img',
        imgClass: 'edit_profile_avatar_img',
        imageSubContainerClass: 'edit_profile_image_sub_container',
        imgId: 'edit_profile_avatar_img',
        imgName: 'EditProfileAvatarImg',
        imgTitle: 'Edit Profile Avatar Image',
        img: avatar,
        inputSubContainerClass: 'edit_profile_input_sub_container',
        label: 'Profile Picture',
        labelClass: 'edit_profile_image_button_label',
        multiple: false,
        onChange: onAvatarChange,
        type: 'file'
      },
      {
        errorContainerClass: 'edit_profile_form_error_container',
        errorClass: 'edit_profile_form_error',
        id: 'user_name',
        inputSubContainerClass: 'edit_profile_input_sub_container',
        inputClass: 'edit_profile_input',
        label: 'User Name',
        name: 'userName',
        onChange: onChange,
        placeholder: 'User Name...',
        type: 'text',
        val: user_name
      },
      {
        errorContainerClass: 'edit_profile_form_error_container',
        errorClass: 'edit_profile_form_error',
        id: 'email',
        inputSubContainerClass: 'edit_profile_input_sub_container',
        inputClass: 'edit_profile_input',
        label: 'Email',
        name: 'email',
        onChange: onChange,
        placeholder: 'Email...',
        type: 'text',
        val: email
      },
      [
        {
          inputSubContainerClass: 'edit_profile_input_sub_container',
          label: 'Name'
        },
        {
          errorContainerClass: 'edit_profile_form_error_container',
          errorClass: 'edit_profile_form_error',
          id: 'first_name',
          inputSubContainerClass: 'edit_profile_input_sub_container',
          inputClass: 'edit_profile_input',
          name: 'firstName',
          onChange: onChange,
          placeholder: 'First Name...',
          type: 'text',
          val: first_name
        },
        {
          errorContainerClass: 'edit_profile_form_error_container',
          errorClass: 'edit_profile_form_error',
          id: 'last_name',
          inputSubContainerClass: 'edit_profile_input_sub_container',
          inputClass: 'edit_profile_input',
          name: 'lastName',
          onChange: onChange,
          placeholder: 'Last Name...',
          type: 'text',
          val: last_name
        }
      ],
      {
        errorContainerClass: 'edit_profile_form_error_container',
        errorClass: 'edit_profile_form_error',
        id: 'country',
        inputSubContainerClass: 'edit_profile_input_sub_container',
        label: 'Country',
        name: 'country',
        onChange: onChange,
        options: flagIconIndex,
        selectClass: 'edit_profile_select',
        type: 'select',
        val: country
      },
      {
        errorContainerClass: 'edit_profile_form_error_container',
        errorClass: 'edit_profile_form_error',
        id: 'bio',
        inputSubContainerClass: 'edit_profile_input_sub_container',
        inputClass: 'edit_profile_input',
        label: 'Biography',
        max: 255,
        min: 1,
        name: 'bio',
        onChange: onChange,
        placeholder: 'Tell us about yourself...',
        rows: 5,
        type: 'textarea',
        val: bio
      },
      [
        {
          errorContainerClass: 'edit_profile_form_error_container',
          errorClass: 'edit_profile_form_error',
          id: 'gender',
          inputSubContainerClass: 'edit_profile_input_sub_container',
          label: 'Gender',
          name: 'gender',
          onChange: onChange,
          options: genders,
          selectClass: 'edit_profile_select',
          type: 'select',
          val: gender
        },
        {
          errorContainerClass: 'edit_profile_form_error_container',
          errorClass: 'edit_profile_form_error',
          id: 'gender_pronouns',
          inputSubContainerClass: 'edit_profile_input_sub_container',
          label: 'Pronouns',
          name: 'genderPronouns',
          onChange: onChange,
          options: gender_pronouns,
          selectClass: 'edit_profile_select',
          type: 'select',
          val: genderPronouns
        }
      ],
      [
        {
          inputSubContainerClass: 'edit_profile_input_sub_container',
          label: 'Date Of Birth'
        },
        {
          errorContainerClass: 'edit_profile_form_error_container',
          errorClass: 'edit_profile_form_error',
          id: 'day',
          inputSubContainerClass: 'edit_profile_input_sub_container',
          inputClass: 'edit_profile_input',
          max: 31,
          min: 1,
          name: 'day',
          onChange: onDOBChange,
          placeholder: 'Day...',
          type: 'number',
          val: dob.day
        },
        {
          errorContainerClass: 'edit_profile_form_error_container',
          errorClass: 'edit_profile_form_error',
          id: 'month',
          inputSubContainerClass: 'edit_profile_input_sub_container',
          name: 'month',
          options: months,
          onChange: onDOBChange,
          selectClass: 'edit_profile_select',
          type: 'select',
          val: dob.month
        },
        {
          errorContainerClass: 'edit_profile_form_error_container',
          errorClass: 'edit_profile_form_error',
          id: 'year',
          inputSubContainerClass: 'edit_profile_input_sub_container',
          inputClass: 'edit_profile_input',
          name: 'year',
          max: 2020,
          min: 1900,
          onChange: onDOBChange,
          placeholder: 'Year...',
          type: 'number',
          val: dob.year
        }
      ]
    ]
  }

export default makeDashboardEditProfileFormInputs