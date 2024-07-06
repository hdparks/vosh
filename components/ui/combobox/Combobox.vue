<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button variant="outline" role="combobox" :aria-expanded="open" class="w-[200px] justify-between">
        <slot name="selected" :modelValue="modelValue" >{{ modelValue ?? placeholder}}</slot> 
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50"/>
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <Command :modelValue="modelValue as AcceptableValue" @update:modelValue="emit('update:modelValue',$event as T)" :filter-function="filterFunction">
        <CommandInput placeholder="Search..." />
        <CommandEmpty>Nothing found</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem v-for="item, i in items" :key="i" :value="item" @select="open = false">
              <Check class="mr-2 h-4 w-4" :class="{'opacity-100': modelValue == item, 'opacity-0': modelValue != item}"/>
              <slot name="item" :item="item">{{item}}</slot>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
<script setup lang="ts" generic="T extends AcceptableValue">
import { Check, ChevronsUpDown } from 'lucide-vue-next';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Command, CommandInput, CommandEmpty, CommandList, CommandGroup, CommandItem} from '../command';
import type { AcceptableValue, ArrayOrWrapped } from '~/lib/utils';
import { Button } from '../button';

const open = ref<boolean>(false)
withDefaults(defineProps<{modelValue:T|null, items:T[], placeholder?:string, filterFunction?: (val: ArrayOrWrapped<T>, term: string) => ArrayOrWrapped<T>}>(), {placeholder: "Select", })
const emit = defineEmits<{
  (e:"update:modelValue", modelValue: T|null): void
}>()
</script>

