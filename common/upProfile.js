module.exports.uploadFile = function(files){
	let profile = files.profile;
	profile.mv('./uploads/' + profile.name);

	return profile.name;

}

// ganesh.tiwari@sundaymobility.com