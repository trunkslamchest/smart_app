const makeDashboardProfileFields = (userName, email, firstName, lastName, bio, country, gender, genderPronouns, fullDOB, dobDay, dobMonth, dobYear) => {
  return [
    {
      name: 'User Name',
      data: userName,
      errors: userName.error
    },
    {
      name: 'Email',
      data: email,
      errors: email.error
    },
    {
      name: 'Name',
      data: `${firstName.field} ${lastName.field}`,
      errors: [ {error: firstName.error}, { error: lastName.error } ]
    },
    {
      name: 'Biography',
      data: bio.field,
      errors: bio.error
    },
    {
      name: 'Country',
      data: country.field,
      errors: country.error
    },
    {
      name: 'Gender',
      data: gender.field,
      errors: gender.error
    },
    {
      name: 'Gender Pronouns',
      data: genderPronouns.field,
      errors: genderPronouns.error
    },
    {
      name: 'Date Of Birth',
      data: fullDOB,
      errors: [ { error: dobDay.error}, { error: dobMonth.error }, { error: dobYear.error} ]
    }
  ]
}

export default makeDashboardProfileFields