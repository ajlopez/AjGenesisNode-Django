from django.contrib import admin
<# entities.forEach(function (entity) { #>
from entities.models import ${entity.classname}
<# }); #>

<# entities.forEach(function (entity) { #>
admin.site.register(${entity.classname})
<# }); #>
