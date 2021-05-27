const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
module.exports.validateSignupInput = (firstName, lastName, email, phoneNumber, password, confirmPassword) => {
    const errors = {};
    if (!email.trim()) {
        errors.email = 'email must not be empty';
    } else if (!email.match(regEx)) {
        errors.email = 'invalid email format';
    }

    if (!firstName.trim()) {
        errors.firstName = 'firstName must not be empty';
    }

    if (!lastName.trim()) {
        errors.lastName = 'lastName must not be empty';
    }

    if (!phoneNumber.trim()) {
        errors.phoneNumber = 'lastName must not be empty';
    }

    if (!password) {
        errors.password = 'password must not be empty';
    } else if (confirmPassword !== password) {
        errors.confirmPassword = 'must match password';
    }

    return {
        errors,
        isValid: Object.keys(errors).length  < 1
    }
}

module.exports.validateSignInInput = (email, password) => {
    const errors = {};
    if (!email.trim()) {
        errors.email = 'email must not be empty';
    }else if (!email.match(regEx)) {
        errors.email = 'invalid email format';
    }

    if (!password) {
        errors.password = 'password must not be empty';
    }
    
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    }
}

module.exports.validateBabyInput = (firstName,gender,birthday) => {
    const errors = {};
    if (!firstName.trim()) {
        errors.firstName = 'firstName must not be empty';
    }
    if (!gender.trim()) {

        errors.gender = 'gender must not be empty';
    }
    if (!birthday.trim()) {
        errors.birthday = 'birthday must not be empty';
    }
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    }
}

module.exports.validateBottleInput = (date, quantity) => {
    const errors = {};
    if (!date.trim()) {
        errors.date = 'date must not be empty';
    }
    if (!quantity.trim()) {
        errors.quantity = 'quantity must not be empty';
    }
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    };
}
module.exports.validateFoodInput = (date,foodName, descr) => {
    const errors = {};
    if (!date.trim()) {
        errors.date = 'date must not be empty';
    }
    if (!descr.trim()) {
        errors.descr = 'Quantity must not be empty';
    }  
    if (!foodName.trim()) {
        errors.foodName = 'FoodName must not be empty';
    }
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    };
}

module.exports.validateHeightInput = (date, measure) => {
    const errors = {};
    if (!date.trim()) {
        errors.date = 'Date must not be empty';
    }
    if (!measure.trim()) {
        errors.measure = 'Measure must not be empty';
    }
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    };
}

module.exports.validateVaccinInput = (date, vaccinName) => {
    const errors = {};
    if (!date.trim()) {
        errors.date = 'Date must not be empty';
    }
    if (!vaccinName.trim()) {
        errors.vaccinName = 'VaccinName must not be empty';
    }
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    };
}
module.exports.validateHeadInput = (date, measure) => {
    const errors = {};
    if (!date.trim()) {
        errors.date = 'Date must not be empty';
    }
    if (!measure.trim()) {
        errors.measure = 'Measure must not be empty';
    }
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    };
}
module.exports.validateTempInput = (date, measure) => {
    const errors = {};
    if (!date.trim()) {
        errors.date = 'Date must not be empty';
    }
    if (!measure.trim()) {
        errors.measure = 'Measure must not be empty';
    }
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    };
}
module.exports.validateDrugInput = (date, name) => {
    const errors = {};
    if (!date.trim()) {
        errors.date = 'Date must not be empty';
    }
    if (!name.trim()) {
        errors.name = 'Name must not be empty';
    }
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    };
}

//couche
module.exports.validateCoucheInput = (date, etat) => {
    const errors = {};
    if (!date.trim()) {
        errors.date = 'Date must not be empty';
    }
    if (!etat.trim()) {
        errors.etat = 'Type must not be empty';
    }
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    };
}

//sleep
module.exports.validateSleepInput = (dateDebut,dateFin) => {
    const errors = {};
    if (!dateDebut.trim()) {
        errors.date = 'Date debut  must not be empty';
    }
    if (!dateFin.trim()) {
        errors.duree = 'Date fin must not be empty';
    }
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    };
}


module.exports.validateWeightInput = (date, measure) => {
    const errors = {};
    if (!date.trim()) {
        errors.date = 'Date must not be empty';
    }
    if (!measure.trim()) {
        errors.measure = 'Measure must not be empty';
    }
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    };
}
module.exports.validatePediatreInput = (firstName, lastName,town,adress,telephone) => {
    const errors = {};
    if (!firstName.trim()) {
        errors.firstName = 'firstName must not be empty';
    }
    if (!lastName.trim()) {
        errors.lastName = 'lastName must not be empty';
    } if (!town.trim()) {
        errors.town = 'town must not be empty';
    } if (!adress.trim()) {
        errors.adress = 'adress must not be empty';
    } if (!telephone.trim()) {
        errors.telephone = 'telephone must not be empty';
    }
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    };
}
module.exports.validateTaskInput = (title) => {
    const errors = {};
    if (!title.trim()) {
        errors.title = 'title must not be empty';
    }
  /*  if (!desc.trim()) {
        errors.desc = 'desc must not be empty';
    }*/
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    };
}
module.exports.validateRappelInput = (title,desc,date) => {
    const errors = {};
    if (!title.trim()) {
        errors.title = 'title must not be empty';
    }
    if (!desc.trim()) {
        errors.desc = 'desc must not be empty';
    }   if (!date.trim()) {
        errors.date = 'date must not be empty';
    }
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    };
}
module.exports.validateArticleInput = (title,content) => {
    const errors = {};
    if (!title.trim()) {
        errors.title = 'title must not be empty';
    }
  //  if (!content.trim()) {
     //   errors.content = 'content must not be empty';
    //}   
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    };
   
}
module.exports.validateAllergieInput    = (name,content) => {
    const errors = {};
    if (!name.trim()) {
        errors.name = 'allergieName must not be empty';
    }
  //  if (!content.trim()) {
     //   errors.content = 'content must not be empty';
    //}   
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    };

}
module.exports.validateCroissanceInput= (poids,taille , perimetre) => {
    const errors = {};
    if (!poids.trim()) {
        errors.name = 'poids  must not be empty';
    }
    if (!taille.trim()) {
        errors.name = 'taille  must not be empty';
    }
   if (!perimetre.trim()) {
       errors.content = 'perimetre must not be empty';
    }   
    return {
        errors,
       isValid: Object.keys(errors).length < 1
    };
}