import time
from flask import request
from . import api
from app import db
from ..helper import build_success_response, build_error_response, bad_request, with_pagination
from models.glossary import Glossary, glossarySchema


# 无分页的简化列表
@api.route('/glossary_complete', methods=['GET'])
def get_glossary_complete():
    glossaries = Glossary.query.filter_by(delete=0).all()
    result = { g.word: g.translation for g in glossaries }
    return build_success_response(data={'result': result })


# 有分页的完整列表
@api.route('/glossaries', methods=['GET'])
@with_pagination
def get_paginated_glossaries():
    page = request.page
    page_size = request.page_size
    pagination = Glossary.query.filter_by(delete=0).paginate(page, page_size, False)
    glossaries = glossarySchema.dump(pagination.items, many=True)
    return build_success_response(data={'result': {'glossaries': glossaries, 'total': pagination.total}})


# 详情
@api.route('/glossary', methods=['GET'])
def get_glossary():
    word = request.args.get('word', '').lower()
    glossary = Glossary.query.filter_by(word=word, delete=0).first()
    if glossary:
        return build_success_response(data={'result':  glossarySchema.dump(glossary)})
    else:
        return build_error_response(msg='not found')


# 修改/新增
@api.route('/glossary', methods=['POST'])
def update_glossary():
    payload = request.get_json(force=True)
    word = payload.get('word', '').lower()
    translation = payload.get('translation', '')
    remark = payload.get('remark', '')
    author = payload.get('author', '')

    if not translation or not author:
        return bad_request('缺少参数')
    
    glossary = Glossary.query.filter_by(word=word, delete=0).first()
    if glossary:
        glossary.translation = translation
        glossary.remark = remark
        glossary.updater = author
        glossary.updatetime = time.time()
    else:
        glossary = Glossary(word=word, translation=translation, remark=remark, creator=author, updater=author)

    db.session.add(glossary)
    db.session.commit()

    return build_success_response(data={'result': glossarySchema.dump(glossary)})
