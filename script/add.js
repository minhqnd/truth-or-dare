function send() {
    firebase.database().ref(`Cards`).push({
        dare: $("#dare").val(),
        truth: $("#truth").val(),
    }).then(result => {
        console.log('done')
    })
}