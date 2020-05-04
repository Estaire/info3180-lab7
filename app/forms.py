from flask_wtf import FlaskForm
from wtforms import TextAreaField
from flask_wtf.file import FileField, FileAllowed, FileRequired

class UploadForm(FlaskForm):
	description = TextAreaField()
	photo = FileField('image', validators=[
		FileRequired(),
		FileAllowed(['jpg', 'png'], 'Images only!')
	])
