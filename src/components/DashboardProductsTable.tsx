import {
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Heading,
  Highlight,
  Text,
  Image,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import DashboardProductSkeleton from "./skeleteon/DashboardProductSkeleton";
import { useGetDashboardProductsQuery } from "../app/services/apiSlice";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { BiSolidShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import CustomAlertDialog from "./shared/AlertDialog";

const DashboardProductsTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, data } = useGetDashboardProductsQuery({ page: 1 });

  const RenderProductsList = data?.data?.map((product) => {
    const {
      id,
      attributes: { title, price, description, thumbnail },
    } = product;

    return (
      <Tr key={id}>
        <Td>
          <Image
            src={`${import.meta.env.VITE_STRAPI_SERVER_URL}${
              thumbnail.data.attributes.formats.thumbnail.url
            }`}
            boxSize="50px"
            borderRadius="md"
            fit="cover"
            alt="Naruto Uzumaki"
          />
        </Td>
        <Td>{title}</Td>
        <Td>
          <Text>{description.substring(0, 20)}</Text>
        </Td>
        <Td isNumeric>{price}</Td>
        <Td>
          <Flex gap={".5rem"}>
            <Button
              as={Link}
              to={`/dashboard/product/${id}`}
              colorScheme={"green"}
              variant="outline"
            >
              <BiSolidShow />
            </Button>
            <Button colorScheme={"blue"} variant="outline">
              <FaEdit />
            </Button>
            <Button
              colorScheme={"red"}
              variant="outline"
              onClick={() => onOpen()}
            >
              <MdDeleteSweep />
            </Button>
          </Flex>
        </Td>
      </Tr>
    );
  });
  if (isLoading) return <DashboardProductSkeleton />;
  if (!data)
    return (
      <Stack>
        <Heading size="3xl" letterSpacing="tight">
          <Highlight query="with speed" styles={{ color: "teal.600" }}>
            There Are No Products
          </Highlight>
        </Heading>
        <Text fontSize="md" color="fg.muted">
          Create a new Product
        </Text>
      </Stack>
    );
  return (
    <>
      <TableContainer>
        <Table variant="simple" maxW={"90%"}>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th isNumeric>Price</Th>
            </Tr>
          </Thead>
          <Tbody>{RenderProductsList}</Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        title={`Are You Sure`}
        description="Your Are Sure To Delete This Product"
        onTxt="Delete"
        cancelTxt="Cancel"
      />
    </>
  );
};

export default DashboardProductsTable;
