import time
from flask import request
from . import api
from app import db
from ..helper import build_success_response, bad_request
from models.glossary import Glossary, glossarySchema


# 列表
@api.route('/glossaries', methods=['GET'])
def get_all_glossaries():
    glossaries = Glossary.query.filter_by(delete=0).all()
    result = { g.word: g.translation for g in glossaries }
    return build_success_response(data={'result': result })


# 详情
@api.route('/glossary/<word>', methods=['GET'])
def get_glossary(word):
    word = word.lower()
    glossary = Glossary.query.filter_by(word=word, delete=0).first()
    result = glossarySchema.dump(glossary) if glossary else None
    return build_success_response(data={'result':  result})


# 修改/新增
@api.route('/glossary/<word>', methods=['POST'])
def update_glossary(word):
    payload = request.get_json(force=True)
    translation = payload.get('translation', '')
    remark = payload.get('remark', '')
    author = payload.get('author', '')

    if not translation or not author:
        return bad_request('缺少参数')
    
    word = word.lower()
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
