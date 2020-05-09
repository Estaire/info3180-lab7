from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired

class UploadForm(FlaskForm):
	description = TextAreaField('description', validators=[DataRequired()])
	photo = FileField('image', validators=[
		FileRequired(),
		FileAllowed(['jpg', 'png'], 'Images only!')
	])
