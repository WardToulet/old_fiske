import { FunctionalComponent } from 'preact';

export const SelectMultiple: FunctionalComponent = () => {
	return (
		<form class="grid gap-2">
			<select id="" name="" multiple="true" class="md:hidden">
				<optgroup label="group">
					<option value="v1">V1</option>
					<option value="v2">V2</option>
				</optgroup>
				<optgroup label="tag">
					<option value="2000">2001</option>
					<option value="2001">2000</option>
				</optgroup>
			</select>

			<fieldset class="p-4 rounded-lg bg-gray-100 border focus-within:border-gray-400 hidden md:block">
				<legend class="text-gray-600 capitalize text-sm">Groep</legend>		

				<span class="flex gap-4">
					<input id="group_v1" type="checkbox" name="group" value="v1" class="cursor-pointer" />
					<label htmlFor="group_v1">V1</label>
				</span>

				<span class="flex gap-4">
					<input id="group_v2" type="checkbox" name="group" value="v2"  class="cursor-pointer"/>
					<label htmlFor="group_v2">V2</label>
				</span>
			</fieldset>

			<fieldset class="p-4 rounded-lg bg-gray-100 border focus-within:border-gray-400 hidden md:block">
				<legend class="text-gray-600 capitalize text-sm">Tag</legend>		

				<span class="flex gap-4">
					<input id="tag_v1" type="checkbox" name="tag" value="2000" class="cursor-pointer" />
					<label htmlFor="group_v1">2000</label>
				</span>

				<span class="flex gap-4">
					<input id="tag_v2" type="checkbox" name="tag" value="2001" class="cursor-pointer" />
					<label htmlFor="tag_v2">2001</label>
				</span>
			</fieldset>
		</form>
	);
}
