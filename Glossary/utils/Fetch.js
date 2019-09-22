import fetch from 'isomorphic-fetch';
import { message } from 'antd';
import _ from 'lodash';

const defaultError = { response: { errno: -1, msg: '网络错误，请求失败' }, status: 500 };

export default async function custom_fetch(object) {
    const method = _.get(object, 'method', 'GET');
    const params = _.get(object, 'params', {});
    const urlPrefix = _.get(object, 'urlPrefix', '');
    const path = _.get(object, 'path', '');

    const url = process.env.API_ENDPOINT + urlPrefix + path;

    const defaultHeaders = {
        'Accept': 'application/json'
    };

    const options = {
        headers: defaultHeaders,
        method: method,
    };
    if (_.includes(['PUT', 'POST', 'DELETE'], method)) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(params);
    }

    const res = await fetch(url, options)
        .then(response => {
            if (response.status === 200) {
                return response;
            }
            throw response;
        })
        .then(response => response.json())
        .then(data => ({ response: data, status: 200 }))
        .catch(response => {
            if (response.status) {
                return response
                .json()
                .then(data => ({ response: data, status: response.status }))
                .catch(() => defaultError);
            }
            return defaultError;
        });

    const result = res.response;
    if (!_.includes([404, 200], res.status) && result.errno < 8000) {
        message.error(result.msg);
    }

    return result;
}
