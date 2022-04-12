/**
 * Get unique errors field name
 */
/**
 * Get unique errors field name
 */
const uniqueMessage = (errors) => {
  let output;
  try {
    let fieldName = errors.message.split('{')[1].split(':')[0].trim();
    const capitalWord = `${fieldName.split(' ').pop().charAt(0).toUpperCase()}`;

    output = `${capitalWord}${fieldName
      .split(' ')
      .pop()
      .slice(1)} already exists`;
  } catch (ex) {
    output = 'Unique field already exists';
  }

  return output;
};

/**
 * Get the error message from errors object
 */
exports.errorHandler = (errors) => {
  let message = '';

  if (errors.code) {
    switch (errors.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(errors);
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (let errorName in errors.errorors) {
      if (errors.errorors[errorName].message)
        message = errors.errorors[errorName].message;
    }
  }

  return message;
};
