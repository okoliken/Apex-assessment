<template>
  <div class="dropdown-menu">
    <ul class="px-1 pt-2 relative">
      <li class="py-1 px-4 mb-2 hover:bg-greenSoft rounded-[4px] cursor-pointer">Edit</li>
      <li class="py-1 px-4 mb-2 hover:bg-greenSoft rounded-[4px] cursor-pointer">View Profile</li>
      <li class="text-[#D30000] border-t border-lightGray py-2 px-4">Delete</li>

      <div
        @click="$emit('close')"
        class="absolute top-0 cursor-pointer right-0 h-[30px] flex items-center justify-center w-[30px] shadow-lg rounded-full bg-white border-lightGray transform translate-x-4 -translate-y-4"
      >
        <span>
          <svg
            class="transform rotate-12 text-[20px] text-greenDark"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="m7 7l10 10M7 17L17 7"
            />
          </svg>
        </span>
      </div>
    </ul>
  </div>
</template>

<style>
.dropdown-menu {
  position: absolute;
  background-color: white;
  border-radius: 5px;
  z-index: 1000;
  margin-left: -127px;
  top: 64px;
  /* height: 107.31px; */
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  width: 154px;
}
</style>

