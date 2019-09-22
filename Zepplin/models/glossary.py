import time
from marshmallow import Schema, fields
from marshmallow_sqlalchemy import ModelSchema
from app import db, db_prefix

class Glossary(db.Model):
    __tablename__ = db_prefix + 'glossary'
    gid = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(100), unique=True, index=True)
    translation = db.Column(db.String(100))
    remark = db.Column(db.Text, default='')
    creator = db.Column(db.String(100))
    createtime = db.Column(db.Integer(), default=time.time)
    updater = db.Column(db.String(100))
    updatetime = db.Column(db.Integer(), default=time.time)
    delete = db.Column(db.Integer, default=0)

    @staticmethod
    def generate_fake(num=20):
        from sqlalchemy.exc import IntegrityError
        from random import seed, randint
        import forgery_py
        seed()
        count = 0
        while count < num:
            updatetime = time.time() - randint(0, 60 * 60 * 24 * 30)
            createtime = updatetime - randint(0, 60 * 60 * 24 * 30)
            g = Glossary(word=forgery_py.lorem_ipsum.word(), translation=forgery_py.lorem_ipsum.word(), 
                         remark=forgery_py.lorem_ipsum.sentence(), creator=forgery_py.name.full_name(), 
                         createtime=createtime, updatetime=updatetime)
            db.session.add(g)
            try:
                db.session.commit()
                count += 1
            except IntegrityError:
                db.session.rollback()

class GlossarySchema(ModelSchema):
    class Meta:
        model = Glossary
        exclude = ('delete', )

glossarySchema = GlossarySchema()