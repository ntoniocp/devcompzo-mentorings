import { useState, useEffect } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Switch,
  Tag,
  TagCloseButton,
  TagLabel,
  Textarea,
} from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { EditableMentorData } from "../../types/mentor";
import { getAvatarPlaceHolder } from "../../utils/avatar";
import AvatarSelector from "../AvatarSelector";

export type FormValues = Omit<EditableMentorData, "tags" | "active"> & {
  tags: { name: string }[];
  id?: string;
};

interface Props {
  onSubmit: (values: FormValues) => void;
  initialValues?: EditableMentorData;
  formId?: string;
  disableAllFields?: boolean;
}

export default function UserForm({
  initialValues,
  formId,
  onSubmit = () => null,
  disableAllFields = false,
}: Props) {
  const [techArea, setTechArea] = useState("");
  const mappedTags = initialValues?.tags?.map((tag) => ({ name: tag }));

  const { handleSubmit, register, control, watch } = useForm<FormValues>({
    defaultValues: initialValues
      ? { ...initialValues, tags: mappedTags || [] }
      : undefined,
  });

  const { fields, prepend, remove } = useFieldArray({
    name: "tags",
    control,
  });

  const handleTaggAdition = (tagName: string) => {
    if (tagName === " ") return;

    const match = fields.find((field) => field.name === tagName);

    if (!match) {
      prepend({ name: tagName });
      setTechArea("");
    }
  };

  /** TODO: Hacer el manejo de cambio de pictureUrl */
  const picture = null;

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <AvatarSelector
        mb={4}
        marginLeft="50%"
        transform="translateX(-50%)"
        avatarProps={{
          size: "lg",
          src: picture || getAvatarPlaceHolder(initialValues?.fullName || ""),
          marginLeft: "50%",
          transform: "translateX(-50%)",
        }}
        disabled={disableAllFields || true} // Se hardcodea a true mientras no se maneje la subida de la foto
      />

      <FormControl id="fullName" mb={4} isRequired>
        <FormLabel color="gray.100">Nombre y Apellido</FormLabel>
        <Input
          type="text"
          color="gray.400"
          {...register("fullName", {
            required: "Campo requerido",
          })}
          disabled={disableAllFields}
        />
      </FormControl>

      <FormControl id="description" mb={4} isRequired>
        <FormLabel color="gray.100">Descripción de tu perfil</FormLabel>
        <Textarea
          color="gray.400"
          {...register("description", {
            required: "Campo requerido",
          })}
          disabled={disableAllFields}
        />
      </FormControl>

      <FormControl id="tags" mb={4}>
        <FormLabel color="gray.100">Áreas de conocimiento </FormLabel>
        <Flex style={{ gap: 8 }}>
          <Input
            type="text"
            color="gray.400"
            value={techArea}
            onChange={(ev) => setTechArea(ev.target.value)}
            disabled={disableAllFields}
          />
          <Button
            borderWidth={1}
            borderColor="purple.400"
            bg="transparent"
            color="purple.400"
            _hover={{
              bg: "gray.700",
            }}
            _focus={{
              bg: "gray.700",
            }}
            _active={{
              bg: "gray.700",
            }}
            onClick={() => handleTaggAdition(techArea)}
            disabled={disableAllFields}
          >
            Añadir
          </Button>
        </Flex>
        <FormHelperText>Al menos una requerida</FormHelperText>
      </FormControl>
      <Flex flexWrap="wrap" style={{ gap: 8 }}>
        {fields.map(({ name }, index) => (
          <Tag
            key={name}
            size="2xl"
            bg="rgba(0, 0, 0, 0.15)"
            borderStyle="solid"
            borderWidth={1}
            borderColor="gray.600"
            color="white"
            rounded="sm"
            fontWeight={"400"}
            fontSize="xs"
            title={name}
          >
            <TagLabel pl={2} py={2}>
              {name}
            </TagLabel>
            <TagCloseButton
              mr={0.5}
              onClick={() => remove(index)}
              isDisabled={disableAllFields}
            />
          </Tag>
        ))}
      </Flex>
    </form>
  );
}
