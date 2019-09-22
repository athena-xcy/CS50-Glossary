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

class GlossarySchema(ModelSchema):
    class Meta:
        model = Glossary
        exclude = ('delete')

glossarySchema = GlossarySchema()