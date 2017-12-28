

export const fetch_get = (url,header,successcallback,failcallback) =>{

    /*var headers = new Headers();
    headers.append("content-type", "application/json;charset=UTF-8");
*/

        return fetch(url, {
            method: 'get',

        })
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        if (json.err == 0) {
                            if (successcallback)
                                successcallback(json)
                        }else if (failcallback){
                            failcallback(json)
                        }
                    })
                } else {
                    if (failcallback){

                        failcallback(json)
                    }
                }
            })
            .catch(error => console.log(error))
}




export const fetch_post = (url,data,header,successcallback,failcallback) =>{

    return dispatch => {

        return fetch(url, {
            method: 'post',

            /*headers:headers,*/

            /*
             "content-type": "application/json;charset=UTF-8",
             */

            body:JSON.stringify(data)

        })
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        if (json.err == 0) {
                            if (successcallback)
                                successcallback(json)
                        }else if (failcallback){

                            failcallback(json)
                        }
                    })
                } else {
                    if (failcallback){

                        failcallback(json)
                    }
                }
            })
            .catch(error => console.log(error))
    };

}