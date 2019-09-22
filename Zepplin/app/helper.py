from flask import jsonify, json, current_app, request
from functools import wraps

def with_pagination(func):
    @wraps(func)
    def set_pagination(*args, **kwargs):
        max_page_size = current_app.config['MAX_PAGE_SIZE']
        default_page_size = current_app.config['DEFAULT_PAGE_SIZE']
        request.page = request.args.get('pg', current_app.config['DEFAULT_CURRENT_PAGE'], type=int)
        request.page_size = min(max(request.args.get('ps', default_page_size, type=int), 1), max_page_size)
        return func(*args, **kwargs)

    return set_pagination

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