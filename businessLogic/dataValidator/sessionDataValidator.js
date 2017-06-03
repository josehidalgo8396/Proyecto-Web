

exports.validSessionData = function(pData) {
	var informationStatus = {};

	if((pData.userName !== '') & (pData.password !== '')) {
		informationStatus.success = true;
	}
	else {
		informationStatus.success = false;
		informationStatus.message = 'Datos incorrectos, por favor complete todos los campos';
	}
	return informationStatus;
};