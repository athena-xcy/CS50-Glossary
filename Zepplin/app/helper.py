from flask import jsonify, json

def build_success_response(data=None, msg='OK', errno=0, sort_key=True):
    res = {
        'msg': msg,
        'errno': errno,
    }
    if data:
        res.update(data)

    if not sort_key:
        return json.dumps(res, sort_keys=False)
    return jsonify(res)

def build_error_response(data=None, msg='Error', errno=-1):
    res = {
        'msg': msg,
        'errno': errno
    }
    if data:
        res.update(data)

    return jsonify(res)

def not_found(msg='not found'):
    return build_error_response(msg=msg), 404

def bad_request(msg='bad request'):
    return build_error_response(msg=msg), 400