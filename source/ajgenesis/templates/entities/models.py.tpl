from django.db import models

# Create your models here.

<# entities.forEach(function (entity) { #>
class ${entity.classname}(models.Model):
<# entity.properties.forEach(function (property) { #>
    ${property.name} = models.CharField(max_length=200)
<# }); #>
<# }); #>

