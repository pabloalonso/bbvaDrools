<div ng-class="{
    'form-horizontal': properties.labelPosition === 'left' && !properties.labelHidden,
    'row': properties.labelPosition === 'top' && !properties.labelHidden || properties.labelHidden
    }">
    <div class="form-group">
      

        <div
            class="col-xs-{{ 12 - (!properties.labelHidden && properties.labelPosition === 'left' ? properties.labelWidth : 0) }}">
            <p class="input-group">
			<span class="has-float-label">
                <input class="form-control"
                       name="{{ctrl.name}}"
					   id="{{ctrl.name}}"
                       type="text"
                       placeholder="{{ properties.placeholder | uiTranslate }}"
                       ng-model="properties.value"
                       ng-readonly="properties.readOnly"
                       ng-required="properties.required"
                       bs-datepicker
                       data-container="body"
                       data-autoclose="1"
                       data-timezone="UTC"
                       date-format="{{properties.dateFormat | uiTranslate}}"
                       data-trigger="focus"
                       data-start-week="{{ctrl.firstDayOfWeek}}"
                       ng-model-options="{ debounce: 350 }"/>
					     <label
						 for="{{ctrl.name}}"
            ng-if="!properties.labelHidden"
            ng-class="{ 'control-label--required': properties.required }"
            class="control-label">
            {{ properties.label | uiTranslate }}
        </label>
</span>
                <span class="input-group-btn">
                    <button ng-if="properties.showToday" type="button" class="btn btn-default today"
                            ng-click="ctrl.setDateToToday()"
                            ng-disabled="properties.readOnly" ui-translate>
                           Today 
                    </button>
                    <button type="button" class="btn btn-default calendar"
                            ng-click="ctrl.open()"
                            ng-disabled="properties.readOnly">
                        <i class="glyphicon glyphicon-calendar"></i>
                    </button>
                </span>
            </p>
            <div ng-messages="$form[ctrl.name].$dirty && $form[ctrl.name].$error "
                 ng-messages-include="forms-generic-errors.html" role="alert"></div>
        </div>
    </div>
</div>
